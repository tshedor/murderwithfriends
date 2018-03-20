import { firebaseAuth } from '../../constants/firebase';

import moment from 'moment';

export const created = () => ({
  createdAt: moment.utc().format(),
  createdBy: firebaseAuth().currentUser.uid
});

export const updated = () => ({
  updatedAt: moment.utc().format(),
  updatedBy: firebaseAuth().currentUser.uid
});
