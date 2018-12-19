export const signIn = (credentials) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const query = firestore.collection('admins').where("username", "==", credentials.username);
    const snapshot = await query.get();

    if(snapshot.docs.length == 0){
      let err = {
        message: "Wrong username!"
      }
      dispatch({ type: 'LOGIN_ERROR', err })
      return
    }
    const userInfo = snapshot.docs[0].data()
    const email = userInfo.email
    firebase.auth().signInWithEmailAndPassword(
      email,
      credentials.password
    ).then( async () => {
      dispatch({ type: 'LOGIN_SUCCESS'});
    }).catch((err) => {
      let message = err.message
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