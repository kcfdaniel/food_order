const initState = {
  studentID: null
}

const studentReducer = (state = initState, action) => {
  switch(action.type){
    case 'CHANGE_STUDENT':
      console.log('change student');
      return {
        ...state,
        ...action.payload
      }
    case 'UPDATE_STUDENT':
      console.log('update student');
      return {
        ...state,
        ...action.payload
      }
    case 'UPDATE_STUDENT_ERROR':
      console.log('update student error', action.err);
      return state
    default:      
      return state;
  }
}

export default studentReducer