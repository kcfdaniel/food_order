const initState = {
  createPostError: null,
  updatePostError: null,
  selectedPostsIDs: new Set(),
  selectMode: false,
}

const postReducer = (state = initState, action) => {
  switch (action.type){
    case 'CREATE_POST':
      console.log('created post', action.post);
      return {
        ...state,
        createPostError: ""
      }
    case 'CREATE_POST_ERROR':
      console.log('create post error', action.err);
      return {
        ...state,
        createPostError: action.err
      }
    case 'SELECT_POST':
      console.log('select post', action.postID);
      let postID = action.postID;
      let selectedPostsIDs = new Set(state.selectedPostsIDs);
      selectedPostsIDs.add(postID);
      return {
        ...state,
        selectedPostsIDs,
      }
    case 'SELECT_ALL_GENERAL_POSTS':
      console.log('select all posts', action.payload);
      return {
        ...state,
        selectedPostsIDs: new Set(action.payload)
      }
    case 'DESELECT_POST':
      console.log('deselect post', action.postID);
      postID = action.postID;
      selectedPostsIDs = new Set(state.selectedPostsIDs);
      selectedPostsIDs.delete(postID);
      return {
        ...state,
        selectedPostsIDs,
      }
    case 'SET_SELECT_MODE':
      console.log('set select mode', action.selectMode);
      let selectMode = action.selectMode;
      selectedPostsIDs = new Set(state.selectedPostsIDs);
      if(selectMode == false){
        selectedPostsIDs = new Set();
      }
      return {
        ...state,
        selectMode,
        selectedPostsIDs
      }
    case 'UPDATE_POST':
      console.log('update post', action.payload);
      return {
        ...state,
        updatePostError: ""
      }
    case 'UPDATE_POST_ERROR':
      console.log('update post error', action.err);
      return {
        ...state,
        updatePostError: action.err
      }
    default:
      return state;
  }
}

export default postReducer