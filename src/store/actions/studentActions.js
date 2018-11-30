function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const changeStudent = (studentID) => {
  return async (dispatch, getState, {getFirebase}) => {
      if(studentID){
      console.log(studentID)
      localStorage.setItem('studentID', studentID);
      dispatch({ 
        type: 'CHANGE_STUDENT',
        payload: studentID
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

      const studentID = profile.students[[Object.keys(profile.students)[0]]].studentID;
      localStorage.setItem('studentID', studentID);
      dispatch({ 
        type: 'CHANGE_STUDENT',
        payload: studentID
      });
    }
  }
}

export const updateStudent = (student) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const state = getState();
    const firebase = getFirebase();
    const firestore = getFirestore();
    let profile = state.firebase.profile;
    let students = profile.students;
    const studentID = state.student.studentID;
    // const studentPositionInArray = profile.students.indexOf(profile.students.find(s => s.studentID == studentID))
    students[studentID] = student;
    let docID = firebase.auth().currentUser.uid; 
    // firebase.auth().currentUser.updateProfile({
    //   students
    // })
    console.log(student)
    firestore.collection('families').doc(docID).update({
      students
    }).then(() => {
    //   dispatch({type: 'CREATE_PROJECT', project });
    // }).catch((err) => {
    //   dispatch({type: 'CREATE_PROJECT_ERROR', err });      
    // })
    // dispatch({ 
    //   type: 'UPDATE_STUDENT',
    //   payload: student.studentID
    });
  }
}