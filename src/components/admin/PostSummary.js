import React from 'react'
import moment from 'moment'
import { Card, CardTitle } from 'react-materialize'

const PostSummary = ({post}) => {
  return (
    <Card
      className="s"
      header={
        <CardTitle style={{height:"100px", overflow: "hidden"}} 
        image={post.picURL}/>
      }
      title={post.title}
      // reveal={<p>{post.content}</p>}
      style={{margin:"0px"}}
    >
      {post.link ? <p><a href="#">{post.link}</a></p> : ""}
      <p className="grey-text datetime truncate">{moment(post.createAt).calendar()}</p>
    </Card>
  )
}

export default PostSummary