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
    console.log(url)
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