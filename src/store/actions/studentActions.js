function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const changeStudent = (studentDocID) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
      const firestore = getFirestore();
      if(studentDocID){
      console.log(studentDocID)

      localStorage.setItem('studentDocID', studentDocID);
      const docRef = firestore.doc('students/'+studentDocID);
      const doc = await docRef.get();
      dispatch({ 
        type: 'CHANGE_STUDENT',
        payload: doc.data()
      });
    }
    else{
      let state = getState();
      let profile = state.firebase.profile

      while(!profile.students){
        await sleep(500);
        state = getState(); 
        profile = state.firebase.profile; 
      }

      const studentDocID = profile.students[[Object.keys(profile.students)[0]]];
      localStorage.setItem('studentDocID', studentDocID);
      const docRef = firestore.doc('students/'+studentDocID);
      const doc = await docRef.get();
      dispatch({ 
        type: 'CHANGE_STUDENT',
        payload: doc.data()
      });
    }
  }
}

export const updateStudent = (student) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const state = getState();
    const firebase = getFirebase();
    const firestore = getFirestore();
    // let profile = state.firebase.profile;
    // let students = profile.students;
    // const studentID = state.student.studentID;
    // const studentPositionInArray = profile.students.indexOf(profile.students.find(s => s.studentID == studentID))
    // students[studentID] = student;
    // let docID = firebase.auth().currentUser.uid; 
    // firebase.auth().currentUser.updateProfile({
    //   students
    // })
    console.log(student)
    firestore.collection('students').doc(student.studentID).set({
      ...student
    }).then(() => {
      dispatch({ 
        type: 'UPDATE_STUDENT',
        payload: student
      });
    }).catch((err) => {
      dispatch({
        type: 'UPDATE_STUDENT_ERROR', 
        err 
      });      
    })
  }
}