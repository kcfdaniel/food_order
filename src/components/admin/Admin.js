import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import CreatePost from './CreatePost'
import PostList from './PostList'
import SignIn from './SignIn'

class Admin extends Component {
  state = {
    picURL: null,
    pic: null,
    content: "",
    error: "",
    title: "",
    uploading: false,
  }

  render() {
    const { history, posts, profile } = this.props
    console.log(posts)

    //A VERY HACKY WAY TO PREVENT REGULAR USER ACCESSING ADMIN PAGE
    console.log(profile)
    if(!profile.isEmpty){
      history.push('/');
    }

    return (
      <BrowserRouter>
        <div className="App">
        <Route path='/admin' component={Navbar} />
          <Switch> 
            <Route exact path='/admin' component={Dashboard} />
            <Route path='/admin/create-post' component={CreatePost} />
            <Route path='/admin/post-list' component={PostList} />
            {/* <Route path='/project/:id' component={ProjectDetails} /> */}
            <Route path='/admin/signin' component={SignIn} />
            {/* <Route path='/signup' component={SignUp} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.firestore.ordered.posts,
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  // when the projects collections updatesin firestore, it will automatically trigger the firestore reducer
  firestoreConnect([
    { collection: 'posts', orderBy: ['createAt', 'desc']},
    ])
)(Admin);