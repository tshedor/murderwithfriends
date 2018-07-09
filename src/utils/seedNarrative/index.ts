import { execute, makePromise } from 'apollo-link'
import { httpLink } from '+root/constants/apollo'

const {
  CreateRound: MUTATION_CREATE_ROUND,
  CreateClue: MUTATION_CREATE_CLUE,
  CreateInstruction: MUTATION_CREATE_INSTRUCTION,
  CreatePrompt: MUTATION_CREATE_PROMPT,
  CreateCharacter: MUTATION_CREATE_CHARACTER,
  CreateNarrative: MUTATION_CREATE_NARRATIVE,
  CreateCharacterRound: MUTATION_CREATE_CHARACTER_ROUND
} = require('./remote.graphql');

/**
 * Expected JSON schema:
 *
 * ...<narrativeProperties>
 * characters: {
 *   <characterDisplayName>: {
 *     prompts: [String],
 *     ...<characterProperties>
 *   }
 * },
 * rounds: [{
 *   clues: [String],
 *   characters: {
 *     <characterDisplayName>: {
 *       instructions: [ {text: String, isOptional: Boolean } ],
 *       clues: [ { text: String, isOptional: Boolean } ],
 *       text: String
 *     }
 *   }
 * }]
 */

function getMutationFunctionName(query) {
  const pascalCase = query.definitions[0].name.value;

  return `${pascalCase.charAt(0).toLowerCase()}${pascalCase.slice(1)}`
}

const createGraphInstanceWithId = (query, variables) => {
  const operation = {
    query,
    variables
  };

  const key = getMutationFunctionName(query);

  return makePromise( execute(httpLink, operation) ).then(({ data, errors }) => {
    if (errors) {
      console.warn(errors, variables);
    }

    return data[key].id;
  });
}

function createCharacters(characters, narrativeId) {
  const names = Object.keys(characters) || [];

  return Promise.all(
    names.map(name => {
      const { prompts, ...character } = characters[name];
      character.narrativeId = narrativeId;

      return createCharacterAndPrompts(character, prompts);
    })
  );
}

function createRounds(rounds, narrativeId, characterIds: { [key: string]: string }) {
  const reqs = rounds.map((round, i) => {
    round.narrativeId = narrativeId;
    round.order = i;

    return createRound(round, characterIds);
  });
}

async function createRound(roundData, characterIds) {
  const { characters, ...data } = roundData;
  const names = Object.keys(characters) || [];
  const roundId = await createGraphInstanceWithId(MUTATION_CREATE_ROUND, data);

  const makeIteratableCharacterProperty = (characterRoundId, mutation) => {
    return (item, i) => {
      item.characterRoundId = characterRoundId;
      item.order = i;

      return createGraphInstanceWithId(mutation, item);
    };
  }

  const characterRoundAwait = names.map(async function(name) {
    const { instructions, clues, text } = characters[name];
    const characterId = characterIds[name];
    const characterRoundId = await createGraphInstanceWithId(MUTATION_CREATE_CHARACTER_ROUND, { roundId, characterId, text });

    const eachClue = makeIteratableCharacterProperty(characterRoundId, MUTATION_CREATE_CLUE);
    const eachInstruction = makeIteratableCharacterProperty(characterRoundId, MUTATION_CREATE_INSTRUCTION);

    (clues || []).forEach(eachClue);
    (instructions || []).forEach(eachInstruction);
  });
}

async function createCharacterAndPrompts(data, prompts): Promise<{ [key: string]: string}> {
  const characterId = await createGraphInstanceWithId(MUTATION_CREATE_CHARACTER, data);

  prompts.forEach(text => {
    return createGraphInstanceWithId(MUTATION_CREATE_PROMPT, { text, characterId });
  });

  return Promise.resolve({ [data.displayName] : characterId });
}

const seedNarrative = async function(narrative) {
  console.log('starting seed');
  const { characters, rounds, ...data } = narrative;
  const narrativeId = await createGraphInstanceWithId(MUTATION_CREATE_NARRATIVE, data);
  console.log('created narrative instance');

  const characterIds = await createCharacters(characters, narrativeId);
  const merged = characterIds.reduce((obj, current) => {
    const [ key, value ] = Object.entries(current)[0];
    obj[key] = value;

    return obj;
  }, {});
  console.log('created characters');

  createRounds(rounds, narrativeId, merged)
  console.log('created rounds');
}

export default seedNarrative
