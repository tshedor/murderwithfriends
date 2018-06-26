import { firebaseAuth } from 'constants/firebase';

import moment from 'moment';

export function removeUndefinedValues(props={}) {
  Object.keys(props).forEach(key => {
    if (typeof props[key] === 'undefined') {
      delete props[key];
    }
  });

  return props;
}

export const created = () => ({
  createdAt: moment.utc().format(),
  createdBy: firebaseAuth().currentUser.uid
});

export const updated = () => ({
  updatedAt: moment.utc().format(),
  updatedBy: firebaseAuth().currentUser.uid
});
