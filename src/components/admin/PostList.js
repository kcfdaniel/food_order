import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {Button} from 'react-materialize'
import ClickNHold from 'react-click-n-hold'; 
import PostSummary from './PostSummary';
import { selectPost, deselectPost, setSelectMode } from './store/actions/postActions'

class PostList extends Component {
  start(id){
    console.log('START'); 
    const {selectedPostsIDs, selectMode, setSelectMode, selectPost, deselectPost} = this.props
    console.log(selectedPostsIDs)
    console.log(id)
    console.log(selectedPostsIDs.has(id))
    if(selectMode){
      if (selectedPostsIDs.has(id)){
        deselectPost(id)
        selectedPostsIDs.delete(id)
        if(selectedPostsIDs.size == 0){
          setSelectMode(false);
        }
      }
      else{
        selectPost(id)
      }
    }
  } 
  end(e, enough){
		console.log('END');
        console.log(enough ? 'Click released after enough time': 'Click released too soon');            
	} 
  clickNHold(id){
    console.log(id);
    const {selectedPostsIDs, selectPost, setSelectMode} = this.props
    selectPost(id)
    setSelectMode(true);
  } 
  
  render() {
    const {history, posts, auth, selectedPostsIDs} = this.props;
    if (!auth.uid) return <Redirect to='/admin/signin' />
    return (
      <div className="container" style={{"margin-top": "10px"}}>
        <div className="row">
          {posts ? posts.map(post => {
              // <Input id={post.id} onChange={this.handleChange} name='posts' type='checkbox' value={post.title} label={post.title} className='filled-in'/>
            const id = post.id
            let selected = selectedPostsIDs.has(id)
            return <ClickNHold 
              time={0.5}
              onStart={()=>{this.start(id)}}
              onClickNHold={() => this.clickNHold(id)}
              onEnd={this.end}
              id >
                <div className="col s6" style={{padding:"1px"}}>
                  <PostSummary post={post} selected={selected}/>
                </div>
            </ClickNHold>
            }) : ""
          }
        </div>
        <Button waves='light' floating icon='add' className='red create-post' large style={{bottom: '45px', right: '24px'}} onClick={()=>{history.push('/admin/create-post')}} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.firestore.ordered.posts,
    auth: state.firebase.auth,
    selectedPostsIDs: state.post.selectedPostsIDs,
    selectMode: state.post.selectMode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectPost: (postID) => dispatch(selectPost(postID)),
    deselectPost: (postID) => dispatch(deselectPost(postID)),
    setSelectMode: (selectMode) => dispatch(setSelectMode(selectMode)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);