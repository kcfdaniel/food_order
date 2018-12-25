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

    //store picture in firebase
    const pic = post.pic
    let picURL = ""
    if(pic != null){
      const picName = uuidv4() + "_" + Date.now() + "." + pic.name.split('.')[1]
      await storage.ref(`post_pics/${picName}`).put(pic);
      picURL = await storage.ref('post_pics').child(picName).getDownloadURL();
    }

    //store video in firebase
    const video = post.video
    let videoURL = ""
    if(video != null){
      const videoName = uuidv4() + "_" + Date.now() + "." + video.name.split('.')[1]
      await storage.ref(`post_videos/${videoName}`).put(video);
      videoURL = await storage.ref('post_videos').child(videoName).getDownloadURL();
    }
    
    //uploadTask.on('state_changed')...
    const createAt = moment().format('YYYY-MM-DD HH:mm:ss');
    try{
      await firestore.collection('posts').add({
        content: post.content,
        createAt,
        picURL,
        videoURL,
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

export const updatePost = (post) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to database
    const firebase = getFirebase();
    const firestore = getFirestore();
    const storage = firebase.storage();

    let picURL = post.picURL
    //if change pic, try to delete the old pic and try to upload new pic
    if(post.originalPicURL !== post.picURL){
      if(post.originalPicURL !== null && post.originalPicURL !== ""){
        let picRef = ""
        picRef = storage.refFromURL(post.originalPicURL);
        picRef.delete().then(function() {
          // File deleted successfully
        }).catch(function(error) {
          // Uh-oh, an error occurred!
        });
      }

      //try to upload new pic
      if(post.picURL != null && post.picURL != ""){
        //store picture in firebase
        const pic = post.pic
        if(pic != null){
          const picName = uuidv4() + "_" + Date.now() + "." + pic.name.split('.')[1]
          await storage.ref(`post_pics/${picName}`).put(pic);
          picURL = await storage.ref('post_pics').child(picName).getDownloadURL();
        }
      }
    }

    let videoURL = post.videoURL
    //if change video, delete the old video and try to upload new pic
    if(post.originalVideoURL !== post.videoURL){
      if(post.originalVideoURL !== null && post.originalVideoURL !== ""){
        let videoRef = ""
        videoRef = storage.refFromURL(post.originalVideoURL);
        videoRef.delete().then(function() {
          // File deleted successfully
        }).catch(function(error) {
          // Uh-oh, an error occurred!
        });
      }
            
      //try to upload new video
      if(post.videoURL != null && post.videoURL != ""){
        //store video in firebase
        const video = post.video
        if(video != null){
          const videoName = uuidv4() + "_" + Date.now() + "." + video.name.split('.')[1]
          await storage.ref(`post_videos/${videoName}`).put(video);
          videoURL = await storage.ref('post_videos').child(videoName).getDownloadURL();
        }
      }
    }

    await firestore.collection('posts').doc(post.id).update({
      content: post.content,
      picURL,
      videoURL,
      title: post.title,
    }).then(() => {
      dispatch({ 
        type: 'UPDATE_POST',
        payload: post
      });
      return
    }).catch((err) => {
      dispatch({
        type: 'UPDATE_POST_ERROR', 
        err 
      });
      return   
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