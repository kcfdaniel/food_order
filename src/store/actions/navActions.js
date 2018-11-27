export const changeStudent = (studentID) => {
  return (dispatch, getState, {getFirebase}) => {
    console.log(studentID)
    localStorage.setItem('studentID', studentID);
    dispatch({ 
      type: 'CHANGE_STUDENT',
      payload: studentID
    });
  }
}