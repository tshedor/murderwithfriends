import * as types from 'constants/actionTypes';
import durrem from '../constants/durrem.story.json';
import rumder from '../constants/rumder.story.json';

const initialState = {
  previews: {},
  currentNarrative: {
    uid: null
  },
  all: {}
};

[durrem, rumder].forEach(narrative => {
  initialState.previews[narrative.slug] = buildPreview(narrative);
  initialState.all[narrative.slug] = narrative;
});

function buildPreview(narrative) {
  return {
    displayName: narrative.displayName,
    text: narrative.previewText,
    characters: Object.keys(narrative.characters).map(characterKey => {
      const { displayName, previewText } = narrative.characters[characterKey];
      return {
        displayName,
        previewText
      };
    })
  }
}

export default function data(state = initialState, action) {
  switch(action.type) {
    case types.SET_CURRENT_PARTY:
      return {
        ...state,
        currentNarrative: {
          uid: action.party.narrativeId,
          ...state.all[ action.party.narrativeId ]
        }
      };

    case types.RESET:
      return initialState;

    default:
      return state;
  }
};
