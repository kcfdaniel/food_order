import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBXQOZzDj0f0aKEfsJttURjfYivkEs9OBo",
  authDomain: "nutrition-99253.firebaseapp.com",
  databaseURL: "https://nutrition-99253.firebaseio.com",
  projectId: "nutrition-99253",
  storageBucket: "nutrition-99253.appspot.com",
  messagingSenderId: "384430181305"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true})

const storage = firebase.storage();

export {
  storage, firebase as default
}