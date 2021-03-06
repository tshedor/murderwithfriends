import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'

interface GraphQLResponse {
  error: string,
  data?: object
}

interface EventData {
  id: string
}

interface QueryNarrativeCharacters extends GraphQLResponse {
  Party: {
    narrative: {
      characters: {
        id: string
        prompts: { id: string }[]
      }[]
    }
  }
}

interface MutationCreatePlayer extends GraphQLResponse {
  createPlayer: {
    id: string
  }
}

interface MutationAddPartyToUser extends GraphQLResponse {
  party: {
    owner: {
      id: string
    }
  }

  user: {
    id: string
  }
}

const QUERY_NARRATIVE_CHARACTERS = `
query getCharacters($partyId: ID!) {
  Party(id: $partyId) {
    narrative {
      characters {
        id

        prompts {
          id
        }
      }
    }
  }
}
`;

const MUTATION_CREATE_PLAYER = `
mutation CreatePlayer($partyId: ID!, $characterId: ID!) {
  createPlayer(
    partyId: $partyId,
    characterId: $characterId
  ) {
    id
  }
}
`;

const MUTATION_CREATE_PROMPT_ANSWER = `
mutation CreatePromptAnswer($playerId: ID!, $promptId: ID!) {
  createPromptAnswer(
    playerId: $playerId,
    promptId: $promptId,
    text: ""
  ) {
    id
  }
}
`;

const MUTATION_ADD_PARTY_TO_USER = `
mutation AddPartyToUser($partyId: ID!, $userId: ID!) {
  addToPartiesUser(
    partiesPartyId: $partyId,
    ownerUserId: $userId
  ) {
    partiesParty {
      id
    }

    ownerUser {
      id
    }
  }
}
`;

const findPrompts = (characters, characterId) => {
  return characters
    .find(item => item.id === characterId)
    .prompts.map(p => p.id);
}

const generateCharacters = async (api: GraphQLClient, partyId: string) => {
  try {
    const characters = await api.request<QueryNarrativeCharacters>(QUERY_NARRATIVE_CHARACTERS, { partyId }).then(data => data.Party.narrative.characters);

    const characterIds = characters.map(data => data.id);

    return Promise.all(
      characterIds.map(async (characterId) => {
        const playerId = await api.request<MutationCreatePlayer>(MUTATION_CREATE_PLAYER, { partyId, characterId }).then(data => data.createPlayer.id);

        const promptIds = findPrompts(characters, characterId)

        return Promise.all(
          promptIds.map(promptId =>
            api.request(MUTATION_CREATE_PROMPT_ANSWER, { playerId, promptId })
          )
        )
      })
    );
  } catch (e) {
    return Promise.reject({ error: JSON.stringify(e) })
  }
}

export default async function(event: FunctionEvent<EventData>) {
  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');
    const userId = event.context.auth.nodeId;
    const partyId = event.data.id;

    const party = await api.request<MutationAddPartyToUser>(MUTATION_ADD_PARTY_TO_USER, { partyId, userId }).then(data => data);

    if (party && party.error) {
      return party;
    }

    const characters = await generateCharacters(api, partyId).then(data => data);

    if (characters && characters.error) {
      return characters;
    }

    return { data: { id: partyId } };
  } catch (e) {
    console.log(e);
    return { error: 'Unexpected error creating Party' }
  }
}
