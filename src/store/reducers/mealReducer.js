const initState = {
  mealError: null
}

const mealReducer = (state = initState, action) => {
  switch(action.type){
    case 'ORDER_MEAL_ERROR':
    console.log('order meal failed:');
    console.log(action.err);
    return {
        ...state,
        mealError: 'Login failed'
      }
    case 'ORDER_MEAL':
      console.log('order meal success');
      return {
        ...state,
        mealError: null
      }
    case 'GET_NEXT_MONTH_MEAL_RECORD':
      console.log("get next month meal record success");
      return {
        ...state,
        mealError: null,
        nextMonthMealRecord: action.payload
      }
    default:
      return state;
  }
}

export default mealReducer