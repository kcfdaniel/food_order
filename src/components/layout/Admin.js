import React, { Component } from 'react'
import { createPost } from '../../store/actions/postActions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import PreviewPic from './PreviewPic'
import {Input} from 'react-materialize'
class Admin extends Component {
  state = {
    picURL: null,
    pic: null,
    content: "",
    error: "",
    title: "",
  }

  fileSelectedHandler = event => {
    if(event!=null){
      let reader = new FileReader();
      let file = event.target.files[0];
      console.log(event)
      reader.onloadend = () => {
        this.setState({
          pic: file,
          picURL: reader.result
        })
      }
      reader.readAsDataURL(file);
    }
  }

  fileUploadHandler = e => {
    e.preventDefault();
    let error = ""
    console.log(this.state)
    
    if (this.state.content == "") {
      error = "Empty content!"
    }
    if (this.state.pic == null) {
      error = "No image selected!"
    }
    if (this.state.title == "") {
      error = "Empty title!"
    }

    this.setState({
      error
    });

    if (error!=""){
      return
    }

    // console.log(this.props.createPost(this.state))
    this.props.createPost(this.state).then((err)=>{
      if(err == null){
        window.Materialize.toast('Created a new post: ' + this.state.title, 10000)
        this.setState({
          picURL: null,
          pic: null,
          content: "",
          error: "",
          title: "",
        })
        this.fileInput.value = [];
        this.form.reset()
      }
      window.Materialize.toast(err, 10000)
    })
  }

  textChangeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    const { posts } = this.props
    return (
      <div className="container">
        <form action="#" className="white" ref={ref=> this.form = ref}>
          <h5 className="grey-text text-darken-3">Create Post</h5>
          <Input id="title" placeholder="" s={6} label="Title" value={this.state.title} onChange={this.textChangeHandler}/>
          <div className="file-field input-field">
            <div className="btn">
              <span>Add Image</span>
              <input type="file" onChange={this.fileSelectedHandler} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" placeholder="Upload Image" ref={ref=> this.fileInput = ref}/>
            </div>
          </div>
          <PreviewPic picURL={this.state.picURL} />
          <div className="input-field col s12">
            <textarea id="content" className="materialize-textarea" onChange={this.textChangeHandler} value={this.state.content}></textarea>
            <label for="textarea1">Content</label>
          </div>
          <span className="pink-text"> {this.state.error} </span>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0" onClick={this.fileUploadHandler}>Submit</button> 
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.firestore.ordered.posts,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) => dispatch(createPost(post)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  // when the projects collections updatesin firestore, it will automatically trigger the firestore reducer
  firestoreConnect([
    { collection: 'posts', orderBy: ['createAt', 'desc']},
    ])
)(Admin);