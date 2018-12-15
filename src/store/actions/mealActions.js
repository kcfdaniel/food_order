import moment from 'moment'

export const submitMealOrder = (orderList) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const state = getState()
    const firestore = getFirestore();
    console.log(orderList)
    //ORDER_MEAL
    for (var key in orderList) {
      console.log(orderList[key]);
      await firestore.collection('mealRecords').doc().set({
        ...orderList[key]
      }).then(async () => {
        dispatch({type: 'ORDER_MEAL'});
      }).catch((err) => {
        dispatch({type: 'ORDER_MEAL_ERROR', err });      
      })
    }
    //GET_NEXT_MONTH_MEAL_RECORD
    const query = firestore.collection('mealRecords')
    .where("date", ">=", moment().add(1, 'month').startOf('month').format('YYYY-MM-DD'))
    .where("date", "<=", moment().add(1, 'month').endOf('month').format('YYYY-MM-DD'))
    .where("studentID", "==", state.student.studentID)
    .orderBy("date", "desc");

    const snapshot = await query.get();

    let mealRecords = []
    if (snapshot.docs[0]){
      snapshot.docs.forEach(doc => {mealRecords.push(doc.data())
      })
    }
    else{
      console.log("no meal records")
    }
    dispatch({type: 'GET_NEXT_MONTH_MEAL_RECORD', payload: mealRecords});
    }
}