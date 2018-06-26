import * as universal from 'constants/actionTypes'

const initialState = {
  msg: null,
  severity: null, // inactive success error attention delete
  duration: null // pass -1 to disable auto hide of notice
};

function makeTypes(dirPath) {
  const currentDir =  dirPath.split('/').pop();
  const SET = `${currentDir}_SET_NOTICE`;
  const CLEAR = `${currentDir}_CLEAR_NOTICE`;

  return {
    SET,
    CLEAR
  };
}

export const makeReducer = function(dirPath) {
  const types = makeTypes(dirPath);

  const reducer = function(state = initialState, action) {
    switch(action.type) {
      case types.SET:
        return {
          ...state,
          ...res
        };

      case types.CLEAR:
        return initialState;

      case universal.CLEAR_ALL_NOTICES:
        return initialState;

      case RESET:
        return initialState;

      default:
        return state;
    }
  };

  return reducer;
}

export const makeActionCreators = function(dirPath) {
  const types = makeTypes(dirPath);

  const setNotice = function(msg, {duration=3500, severity=null}={}) {
    return {
      type: types.SET,
      msg,
      duration,
      severity
    };
  }

  const clearNotice = function() {
    return {
      type: types.CLEAR
    };
  }

  return {
    setNotice,
    clearNotice
  };
};
