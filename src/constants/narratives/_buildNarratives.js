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
    totalRounds: narrative.rounds.length
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
