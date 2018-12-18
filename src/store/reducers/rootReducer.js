import authReducer from './authReducer'
import studentReducer from './studentReducer'
import projectReducer from './projectReducer'
import mealReducer from './mealReducer'
import postReducer from './postReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  student: studentReducer,
  project: projectReducer,
  meal: mealReducer,
  post: postReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer