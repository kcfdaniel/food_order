import React from 'react'
import moment from 'moment'
import { Card, CardTitle } from 'react-materialize'

class PostSummary extends React.Component{
  state={
    playingVideo: false
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
  render(){
    const {post} = this.props
    let header = ""

    //if post has video, render video
    if(post.videoURL == "" || post.videoURL == null) {
      header = (<CardTitle reveal image={post.picURL} waves='light'/>)
    }
    //if post doesn't have video, then render the image
    else{
      header = 
        (<video ref="video" width="100%" onClick={this.toggleVideoPlay} controls className="responsive-video">
          <source src={post.videoURL} id="video_here"/>
            Your browser does not support HTML5 video.
        </video>)
    }
    return (
      <Card header={header}
        title={post.title}
        reveal={<p>{post.content}</p>}>
        {post.link ? <p><a href="#">{post.link}</a></p> : ""}
        <p className="grey-text">{moment(post.createAt).calendar()}</p>
      </Card>
    )
  }
}

export default PostSummary