import React, { Component } from 'react'
import {Input} from 'react-materialize'
import PreviewPic from './PreviewPic'
import PreviewVideo from './PreviewVideo'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createGeneralPost } from './store/actions/postActions'

class CreateGeneralPost extends Component {
  state = {
    picURL: null,
    pic: null,
    video: null,
    videoURL: null,
    content: "",
    error: "",
    title: "",
    uploading: false,
  }

  toggleVideoPlay = () => {
    if(this.state.playingVideo){
      this.refs.video.pause();
      this.setState({
        playingVideo: false
      });
    }
    else{
      this.refs.video.play();
      this.setState({
        playingVideo: true
      });
    }
  }
  
  imageFileSelectedHandler = event => {
    if(event!=null){
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend = () => {
        this.setState({
          pic: file,
          picURL: reader.result
        })
      }
      if (file != null){
        reader.readAsDataURL(file);
      }
    }
  }

  videoFileSelectedHandler = event => {
    if(event!=null){
      this.setState({
        video: null,
        videoURL: null,
      })
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend = () => {
        this.setState({
          video: file,
          videoURL: reader.result
        })
      }
      if (file != null){
        reader.readAsDataURL(file);
      }
    }
  }

  submit = e => {
    e.preventDefault();
    console.log("submit")
    let error = ""
    
    // content is optional
    // if (this.state.content == "") {
    //   error = "Empty content!"
    // }
    if ((this.state.videoURL == null || this.state.videoURL == "") && (this.state.picURL == null || this.state.picURL == "")) {
      error = "You have to select either a video or an image!"
    }
    if ((this.state.videoURL != null && this.state.videoURL != "") && (this.state.picURL != null && this.state.picURL != "")) {
      error = "You can only select a video or an image!"
    }
    if (this.state.title == "") {
      error = "Empty title!"
    }

    this.setState({
      error,
    });

    if (error!=""){
      return
    }

    this.setState({
      uploading: true
    });

    this.props.createGeneralPost(this.state).then((err)=>{
      if(err == null){
        window.Materialize.toast('Created a new post: ' + this.state.title, 10000)
        this.setState({
          picURL: null,
          pic: null,
          video: null,
          videoURL: null,
          content: "",
          error: "",
          title: "",
          uploading: false,
        })
        this.imageFileInput.value = [];
        this.videoFileInput.value = [];
        this.form.reset();
        this.props.history.push('/admin/general');
      }
      window.Materialize.toast(err, 10000)
    })
  }

  clearPic = () => {
    this.setState({
      pic: null,
      picURL: null,
    })
    this.imageFileInput.value = null;
    this.imageFileInputText.value = null;
  }

  clearVideo = () => {
    this.setState({
      video: null,
      videoURL: null,
    })
    this.videoFileInput.value = null;
    this.videoFileInputText.value = null;
  }

  textChangeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  cancel = () => {
    this.props.history.push('/admin/general');
  }

  render() {
    const {auth} = this.props;
    if (!auth.uid) return <Redirect to='/admin/signin' />

    return (
      <div className="container">
        <form action="#" className="white" ref={ref=> this.form = ref}>
          <h5 className="grey-text text-darken-3">Create Post</h5>
          <Input id="title" placeholder="" s={6} label="Title" value={this.state.title} onChange={this.textChangeHandler}/>
          <div className="file-field input-field">
            <div className="btn">
              <span>Add Image</span>
              <input ref={ref=> this.imageFileInput = ref} type="file" onChange={this.imageFileSelectedHandler} />
            </div>
            <div className="file-path-wrapper">
              <input ref={ref=> this.imageFileInputText = ref} className="file-path validate" type="text" placeholder="Upload Image"/>
            </div>
          </div>
          {this.state.picURL != null && this.state.picURL != "" ? 
            <div style={{position: "relative"}}>
              <span style={{position: "absolute",
                top: "2px",
                right: "2px",
                zIndex: "100",}}
              >
                  <i onClick={this.clearPic} style={{cursor: "pointer"}} className="material-icons">clear</i>
              </span>
              <PreviewPic picURL={this.state.picURL} />
            </div>
          : "" }
          <div className="file-field input-field">
            <div className="btn">
              <span>Add Video</span>
              <input ref={ref=> this.videoFileInput = ref} type="file" onChange={this.videoFileSelectedHandler} />
            </div>
            <div className="file-path-wrapper">
              <input ref={ref=> this.videoFileInputText = ref} className="file-path validate" type="text" placeholder="Upload Video"/>
            </div>
          </div>
          { this.state.videoURL != null && this.state.videoURL != "" ? 
            <div style={{position: "relative"}}>
              <span style={{position: "absolute",
                  top: "2px",
                  right: "2px",
                  zIndex: "100",}}
              >
                <i onClick={this.clearVideo} style={{cursor: "pointer"}} className="material-icons">clear</i>
              </span>
              <video ref="video" width="100%" controls onClick={this.toggleVideoPlay} className="responsive-video">
                <source src={this.state.videoURL} id="video_here"/>
                  Your browser does not support HTML5 video.
              </video>
            </div>
            : ""}
          <div className="input-field col s12">
            <textarea id="content" className="materialize-textarea" onChange={this.textChangeHandler} value={this.state.content}></textarea>
            <label htmlFor="textarea1">Content</label>
          </div>
          <span className="pink-text"> {this.state.error} </span>
          <div>
            <div style={{marginLeft: "auto", display: "table"}} className="input-field align-right">
              <button className="btn white lighten-1 z-depth-0" style={{color:"black"}} onClick={this.cancel}>Cancel</button>
              <button className="btn pink lighten-1 z-depth-0" onClick={this.submit} disabled={this.state.uploading}>Submit</button> 
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createGeneralPost: (post) => dispatch(createGeneralPost(post)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGeneralPost);