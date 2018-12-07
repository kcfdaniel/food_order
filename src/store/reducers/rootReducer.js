import authReducer from './authReducer'
import studentReducer from './studentReducer'
import projectReducer from './projectReducer'
import mealReducer from './mealReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  student: studentReducer,
  project: projectReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  meal: mealReducer
});

export default rootReducer