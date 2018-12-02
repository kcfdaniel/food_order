import moment from 'moment'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const submitMealOrder = (orderList) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    console.log(orderList)
    for (var key in orderList) {
      console.log(orderList[key]);
      firestore.collection('mealRecords').doc(key).set({
        ...orderList[key]
      }).then(() => {
        dispatch({type: 'ORDER_MEAL'});
      }).catch((err) => {
        dispatch({type: 'ORDER_MEAL_ERROR', err });      
      })
    }
  }
}