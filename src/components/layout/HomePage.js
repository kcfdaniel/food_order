import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Tabs, Tab} from 'react-materialize'
import Dashboard from '../dashboard/Dashboard'

class HomePage extends Component {
  render(){
    // console.log(this.props);
    // const { posts, auth, notifications } = this.props;
    // if (!auth.uid) return <Redirect to='/signin' />
    return(
      <Tabs className='tabs transparent indicator orange'>
        <Tab className='tab' title="Posts" active><Dashboard /></Tab>
        <Tab title="Health">Health</Tab>
        <Tab title="News">News</Tab>
        {/* <Tab title="Test 4">Test 4</Tab> */}
      </Tabs>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // posts: state.firestore.ordered.posts,
    // auth: state.firebase.auth,
    // notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  // when the posts collections updates in firestore, it will automatically trigger the firestore reducer
  firestoreConnect([
    // { collection: 'posts', orderBy: ['createAt', 'desc']},
    // { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']},
  ])
)(HomePage)