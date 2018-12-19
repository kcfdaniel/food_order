const initState = {
  error: null
}

const postReducer = (state = initState, action) => {
  switch (action.type){
    case 'CREATE_POST':
      console.log('created post', action.post);
      return {
        ...state,
        error: ""
      }
    case 'CREATE_POST_ERROR':
      console.log('create post error', action.err);
      return {
        ...state,
        error: action.err
      }
    default:
      return state;
  }
}

export default postReducer