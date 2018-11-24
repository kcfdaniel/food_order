export const signIn = (credentials) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const query = firestore.collection('families').where("username", "==", credentials.username);
    const snapshot = await query.get();
    console.log(snapshot.docs[0].data())

    const userInfo = snapshot.docs[0].data()
    const email = userInfo.email
    firebase.auth().signInWithEmailAndPassword(
      email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS'})
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err })
    })
  }
}

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS'});
    });
  }
}

// export const signUp = (newUser) => {
//   return (dispatch, getState, {getFirebase, getFirestore}) => {
//     const firebase = getFirebase();
//     const firestore = getFirestore();

//     firebase.auth().createUserWithEmailAndPassword(
//       newUser.email,
//       newUser.password
//     ).then((resp) => {
//       //create document with specific ID
//       return firestore.collection('users').doc(resp.user.uid).set({
//         firstName: newUser.firstName,
//         lastName: newUser.lastName,
//         initials: newUser.firstName[0] + newUser.lastName[0]
//       })
//     }).then( () => {
//       dispatch({ type: 'SIGNUP_SUCCESS' })
//     }).catch(err => {
//       dispatch({ type: 'SIGNUP_ERROR', err})
//     })
//   }
// }