import React, { Component } from 'react'
import Notifications from './Notifications'
import PostList from '../projects/PostList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
  render(){
    // console.log(this.props);
    const { posts } = this.props;
    console.log(posts)
    // if (!auth.uid) return <Redirect to='/signin' />

    return(
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m12">
            {/* <postList posts={posts}/> */}
            <PostList posts={posts}/>
          </div>
          {/* <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications}/>
          </div> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    // auth: state.firebase.auth,
    posts: state.firestore.ordered.posts,
    // notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  // when the posts collections updates in firestore, it will automatically trigger the firestore reducer
  firestoreConnect([
    { collection: 'posts', orderBy: ['createAt', 'desc']},
    // { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']},
  ])
)(Dashboard)