import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {Button} from 'react-materialize'
import PostSummary from './PostSummary';
import { selectPost, deselectPost, setSelectMode } from './store/actions/postActions'

class PostList extends Component {
  start = (e,id) => {
    console.log('START');
    const {selectedPostsIDs, selectMode, setSelectMode, selectPost, deselectPost} = this.props
    if(selectMode){
      if (selectedPostsIDs.has(id)){
        deselectPost(id)
        selectedPostsIDs.delete(id)
      }
      else{
        selectPost(id)
      }
    }
    this.longPressTimer = setTimeout(() => {
      console.log("long press")
      const {selectPost, setSelectMode} = this.props
      selectPost(id)
      setSelectMode(true);
    }, 500);
  }
  end = (e, id) => {
    console.log('END');
    const {history, selectMode, selectedPostsIDs, setSelectMode} = this.props;
    if(!selectMode){
      history.push("/admin/edit-post/" + id)
    }
    if(selectedPostsIDs.size === 0){
      setSelectMode(false);
    }
    clearTimeout(this.longPressTimer);
    e.preventDefault();
	} 
  
  render() {
    const {history, generalPosts, auth, selectedPostsIDs, selectMode} = this.props;
    if (!auth.uid) return <Redirect to='/admin/signin' />
    return (
      <div className="container" style={{"marginTop": "10px"}}>
        <div className="row">
          {generalPosts ? generalPosts.map(post => {
              // <Input id={post.id} onChange={this.handleChange} name='posts' type='checkbox' value={post.title} label={post.title} className='filled-in'/>
            const id = post.id
            let selected = selectedPostsIDs.has(id)
            return (
              //all the onTouchStart, onxxxxx are for mobile to work
              <div className="col s6" key={id} style={{padding:"1px"}} onContextMenu={(e)=>{e.preventDefault();}} onTouchStart={(e)=>this.start(e,id)} onTouchEnd={(e)=>this.end(e,id)} onMouseDown={(e)=>this.start(e,id)} onMouseUp={(e)=>this.end(e,id)}>
                <PostSummary post={post} selected={selected}/>
              </div>
            )
            }) : ""
          }
        </div>
        {selectMode ? "" : <Button waves='light' floating icon='add' className='red create-post' large style={{bottom: '45px', right: '24px'}} onClick={()=>{history.push('/admin/create-post')}} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    generalPosts: state.firestore.ordered.generalPosts,
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