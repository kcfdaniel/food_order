import React from 'react'
import moment from 'moment'
import { Card, CardTitle, Button } from 'react-materialize'

const PostSummary = ({post ,selected}) => {
  let header = ""

  //if post has video, render video
  if(post.videoURL == "" || post.videoURL == null) {
    header = (<CardTitle style={{height:"100px", overflow: "hidden"}} image={post.picURL}/>)
  }
  //if post doesn't have video, then render the image
  else{
    header = 
      (<video height="95px" width="100%">
        <source src={post.videoURL} id="video_here"/>
          Your browser does not support HTML5 video.
      </video>)
  }
  return (
    <div>
      <Card
        className="s"
        header={header}
        title={post.title}
        reveal={<p>{post.content}</p>}
        style={{margin:"0px"}}
      >
        {post.link ? <p><a href="#">{post.link}</a></p> : ""}
        <p className="grey-text datetime truncate">{moment(post.createAt).calendar()}</p>
        <div className="transparent-cover">
        </div>
        {selected ? 
          <div className="selected-cover">
            <div className="selected-cover-background">
            </div>
            <Button floating className="blue selected-cover-check-button">
              <i className="material-icons selected-cover-check">check</i>
            </Button>
          </div>
          : ""
        }
      </Card>
    </div>
  )
}

export default PostSummary