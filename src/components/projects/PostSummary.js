import React from 'react'
import moment from 'moment'
import { Card, CardTitle } from 'react-materialize'

const PostSummary = ({post}) => {
  return (
    <Card header={<CardTitle reveal image={post.picURL} waves='light'/>}
      title={post.title}
      reveal={<p>{post.content}</p>}>
      {post.link ? <p><a href="#">{post.link}</a></p> : ""}
      <p className="grey-text">{moment(post.createAt).calendar()}</p>
    </Card>

    // <div className="card z-depth-0 project-summary">
    //   <div className="card-content grey-text text-darken-3">
    //     <span className="card-title">{post.title}</span>
    //     <p>Posted by {post.authorFirstName} {post.authorLastName}</p>
    //     <p className="grey-text">{moment(post.createAt).calendar()}</p>
    //   </div>
    // </div>
  )
}

export default PostSummary