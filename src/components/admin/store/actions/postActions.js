import moment from 'moment'

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const createPost = (post) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to database
    const firebase = getFirebase();
    const firestore = getFirestore();
    const storage = firebase.storage();
    const pic = post.pic
    const picURL = uuidv4() + "_" + Date.now() + "." + pic.name.split('.')[1]
    await storage.ref(`post_pics/${picURL}`).put(pic);
    //uploadTask.on('state_changed')...
    const url = await storage.ref('post_pics').child(picURL).getDownloadURL();
    const createAt = moment().format('YYYY-MM-DD hh:mm:ss');
    try{
      await firestore.collection('posts').add({
        content: post.content,
        createAt,
        picURL: url,
        title: post.title,
      })
    } catch (err){
      console.log(err)
      if (err){
        console.log(err)
        dispatch({type: 'CREATE_POST_ERROR', err });
        return err
      }
    }
    dispatch({type: 'CREATE_POST', post });
    return
  }
}

export const deletePosts = (selectedPostsIDs) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to database
    const firebase = getFirebase();
    const firestore = getFirestore();
    const storage = firebase.storage();
    const state = getState();
    const posts = state.firestore.ordered.posts
    let targetPost = {}
    let picURL = ""
    let picRef = ""
    selectedPostsIDs.forEach((postID)=>{
      targetPost = posts.find(post => post.id == postID);
      picURL = targetPost.picURL;
      picRef = storage.refFromURL(picURL);
      // Delete the file
      picRef.delete().then(function() {
        // File deleted successfully
      }).catch(function(error) {
        // Uh-oh, an error occurred!
      });
      firestore.collection("posts").doc(postID).delete().then(function() {
        console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });

    })
  }
}

export const selectPost = (postID) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({type: 'SELECT_POST', postID });
  }
}
export const selectAllPosts = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const state = getState();
    const posts = state.firestore.ordered.posts;
    const postsIDs = posts.map(post => post.id)
    dispatch({type: 'SELECT_ALL_POSTS', payload: postsIDs });
  }
}

export const deselectPost = (postID) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({type: 'DESELECT_POST', postID });
  }
}

export const setSelectMode = (selectMode) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({type: 'SET_SELECT_MODE', selectMode });
  }
}