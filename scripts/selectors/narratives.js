import { createSelector } from 'reselect';

const getCurrentNarrative = state => state.narratives.currentNarrative;

export const hasNarrative = createSelector(
  getCurrentNarrative,
  currentNarrative => {
    return Object.keys(currentNarrative).length !== 0;
  }
);
