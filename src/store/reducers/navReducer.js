const initState = {
  studentID: null
}

const navReducer = (state = initState, action) => {
  switch(action.type){
    case 'CHANGE_STUDENT':
      console.log('change student');
      return {
        ...state,
        studentID: action.payload
      }
    default:
      return state;
  }
}

export default navReducer