import durrem from './durrem.story.json';
import rumder from './rumder.story.json';

const narratives = {
  previews: {},
  all: {}
};

function buildNarrative(narrative) {
  return {
    ...narrative,
    id: narrative.slug,
    totalRounds: narrative.rounds.length,
    clues: narrative.rounds.map((round, roundNumber) => {
      return Object.values(round.characters).filter(c => c.clues).map(character =>
        character.clues.map(clue => ({
          roundNumber,
          hint: clue.hint
        }))
      ).reduce((acc, curr) => acc.concat(curr), []);
    }).filter(Boolean).reduce((acc, curr) => acc.concat(curr), [])
  };
}

function buildPreview(narrative) {
  return {
    displayName: narrative.displayName,
    text: narrative.previewText
  }
}

[durrem, rumder].forEach(narrative => {
  narratives.previews[narrative.slug] = buildPreview(narrative);
  narratives.all[narrative.slug] = buildNarrative(narrative);
});

export default narratives;
