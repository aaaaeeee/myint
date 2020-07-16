import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { getFirebase, actionTypes as rrfActionTypes } from 'react-redux-firebase';
import { constants as rfConstants, createFirestoreInstance } from 'redux-firestore';
import firebase from '../firebase/firebase';
import rootReducer from './rootReducer';

const extraArgument = {
  getFirebase,
};
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        // just ignore every redux-firebase and react-redux-firebase action type
        ...Object.keys(rfConstants.actionTypes).map(
          (type) => `${rfConstants.actionsPrefix}/${type}`
        ),
        ...Object.keys(rrfActionTypes).map((type) => `@@reactReduxFirebase/${type}`),
      ],
      ignoredPaths: ['firebase', 'firestore'],
    },
    thunk: {
      extraArgument,
    },
  }),
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export default store;
