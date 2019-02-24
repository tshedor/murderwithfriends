import * as types from '../constants/actionTypes';

import { refNarrative, table } from '../constants/firebase';

import { updated } from './shared';

let notice_timer;

/**
 * MARK: Redux-only
 */

export function setNotice(msg, {duration=3500, severity=null}={}) {
  return {
    type: types.SET_NOTICE,
    msg,
    duration,
    severity
  };
}

export function clearNotice() {
  return {
    type: types.CLEAR_NOTICE
  };
}
