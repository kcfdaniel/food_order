import moment from 'moment'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const changeStudent = (studentID) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    let state = getState();
    if(!studentID){
      let profile = state.firebase.profile

      while(!profile.students){
        await sleep(500);
        state = getState(); 
        profile = state.firebase.profile; 
      }

      studentID = profile.students[[Object.keys(profile.students)[0]]];
    }
    localStorage.setItem('studentID', studentID);

    let query = firestore.collection('students').where("studentID", "==", studentID);
    let snapshot = await query.get();
    let userInfo = snapshot.docs[0].data()
    dispatch({ 
        type: 'CHANGE_STUDENT',
        payload: userInfo
      });

    //use custom ID
    // const docRef = firestore.doc('students/'+studentID);
    // const doc = await docRef.get();
    // dispatch({ 
    //   type: 'CHANGE_STUDENT',
    //   payload: doc.data()
    // });

    //GET_NEXT_MONTH_MEAL_RECORD
    query = firestore.collection('mealRecords')
    .where("date", ">=", moment().add(1, 'month').startOf('month').format('YYYY-MM-DD'))
    .where("date", "<=", moment().add(1, 'month').endOf('month').format('YYYY-MM-DD'))
    .where("studentID", "==", studentID)
    .orderBy("date", "desc");

    snapshot = await query.get();

    let mealRecords = []
    if (snapshot.docs[0]){
      snapshot.docs.forEach(doc => {mealRecords.push(doc.data())
      })
    }
    else{
      console.log("no next month meal records")
    }
    dispatch({type: 'GET_NEXT_MONTH_MEAL_RECORD', payload: mealRecords});

    //GET_PREVIOUS_MONTH_MEAL_RECORD
    query = firestore.collection('mealRecords')
    .where("date", ">=", moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'))
    .where("date", "<=", moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD'))
    .where("studentID", "==", studentID);
    snapshot = await query.get();

    mealRecords = []
    if (snapshot.docs[0]){
      snapshot.docs.forEach(doc => {mealRecords.push(doc.data())
      })
    }
    else{
      console.log("no next month meal records")
    }
    dispatch({type: 'GET_PREVIOUS_MONTH_MEAL_RECORD', payload: mealRecords});


    //GET_RECENT_MEAL_RECORD
    mealRecords = []

    //get meal records 2 days after today
    query = firestore.collection('mealRecords')
    .where("studentID", "==", studentID)
    .where("date", ">", moment().format('YYYY-MM-DD'))
    .orderBy("date")
    .limit(2);
    snapshot = await query.get();

    if (snapshot.docs[0]){
      snapshot.docs.forEach(doc => {mealRecords.push(doc.data())
      })
    }
    else{
      console.log("no meal records 2 days after today")
    }

    //get meal records 5 days on or before today
    query = firestore.collection('mealRecords')
    .where("studentID", "==", studentID)
    .where("date", "<=", moment().format('YYYY-MM-DD'))
    .orderBy("date", "desc")
    .limit(5);
    snapshot = await query.get();

    if (snapshot.docs[0]){
      snapshot.docs.forEach(doc => {mealRecords.push(doc.data())
      })
    }
    else{
      console.log("no meal records 5 days on or before today")
    }

    dispatch({type: 'GET_RECENT_MEAL_RECORD', payload: mealRecords});
  }
}

export const updateStudent = (student) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    console.log(student)

    let query = firestore.collection('students').where("studentID", "==", student.studentID);
    let snapshot = await query.get();
    let studentDocID = snapshot.docs[0].id

    firestore.collection('students').doc(studentDocID).set({
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

    // use custom ID
    // firestore.collection('students').doc(student.studentID).set({
    //   ...student
    // }).then(() => {
    //   dispatch({ 
    //     type: 'UPDATE_STUDENT',
    //     payload: student
    //   });
    // }).catch((err) => {
    //   dispatch({
    //     type: 'UPDATE_STUDENT_ERROR', 
    //     err 
    //   });      
    // })
  }
}