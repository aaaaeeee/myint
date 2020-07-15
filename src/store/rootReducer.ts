import { combineReducers } from '@reduxjs/toolkit';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import authReducer from '../slices/authSlice';
import interestsReducer from '../slices/interestsSlice';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  interests: interestsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
