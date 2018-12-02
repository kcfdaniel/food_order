import moment from 'moment'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const changeStudent = (studentDocID) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const state = getState();
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
    const query = firestore.collection('mealRecords')
    .where("date", ">=", moment().add(1, 'month').startOf('month').format('YYYY-MM-DD'))
    .where("date", "<=", moment().add(1, 'month').endOf('month').format('YYYY-MM-DD'))
    .where("studentDocID", "==", studentDocID);
    const snapshot = await query.get();

    let mealRecords = {}
    if (snapshot.docs[0]){
      snapshot.docs.forEach(doc => {mealRecords[doc.id] = doc.data()
      })
    }
    else{
      console.log("no meal records")
    }
    dispatch({type: 'GET_NEXT_MONTH_MEAL_RECORD', payload: mealRecords});
  }
}

export const updateStudent = (student) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
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