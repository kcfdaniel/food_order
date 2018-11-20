import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAxbz3FOJZotZddawNWKZ-MmXNzNlEDxyI",
  authDomain: "lunch-d218c.firebaseapp.com",
  databaseURL: "https://lunch-d218c.firebaseio.com",
  projectId: "lunch-d218c",
  storageBucket: "lunch-d218c.appspot.com",
  messagingSenderId: "203520280330"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true})

export default firebase;