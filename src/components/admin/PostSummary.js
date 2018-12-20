import React from 'react'
import moment from 'moment'
import { Card, CardTitle, Button } from 'react-materialize'

const PostSummary = ({post ,selected}) => {
  return (
    <div>
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
        {selected ? 
          <div className="cover">
            <div className="cover-background">
            </div>
            <Button floating className="blue cover-check-button">
              <i className="material-icons cover-check">check</i>
            </Button>
          </div>
          : ""
        }
      </Card>
    </div>
  )
}

export default PostSummary