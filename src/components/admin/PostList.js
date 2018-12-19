import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {Button} from 'react-materialize'
import ClickNHold from 'react-click-n-hold'; 
import PostSummary from './PostSummary';

class PostList extends Component {
  start(e){
		console.log('START'); 
  } 
  end(e, enough){
		console.log('END');
        console.log(enough ? 'Click released after enough time': 'Click released too soon');            
	} 
  clickNHold(e){
		console.log('CLICK AND HOLD');  
  } 
  
  render() {
    const {history, posts, auth} = this.props;
    if (!auth.uid) return <Redirect to='/admin/signin' />
    return (
      <div className="container" style={{"margin-top": "10px"}}>
        <div className="row">
          {posts ? posts.map(post => 
              // <Input id={post.id} onChange={this.handleChange} name='posts' type='checkbox' value={post.title} label={post.title} className='filled-in'/>
            <ClickNHold 
              time={0.5}
              onStart={this.start}
              onClickNHold={this.clickNHold}
              onEnd={this.end} >
                <div className="col s6" style={{padding:"1px"}}>
                  <PostSummary post={post} />
                </div>
            </ClickNHold>
            ) : ""
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
  }
}

export default connect(mapStateToProps)(PostList);