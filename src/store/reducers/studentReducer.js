const initState = {
  studentID: null
}

const studentReducer = (state = initState, action) => {
  switch(action.type){
    case 'CHANGE_STUDENT':
      console.log('change student');
      return {
        ...state,
        studentID: action.payload
      }
    case 'UPDATE_STUDENT':
      console.log('update student');
      return state;
    default:
      return state;
  }
}

export default studentReducer