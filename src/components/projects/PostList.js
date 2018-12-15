import React from 'react'
import PostSummary from './PostSummary'
import { Link } from 'react-router-dom'

const PostList = ({posts}) => {
  return (
    <div className="project-list section">
      {/* if there are any projects at all, map */}
      {posts && posts.map(post => {
        return (
          // <Link to={'/project/' + project.id} key={project.id}>
            <PostSummary post={post}/>
          // </Link>
        )
      })}
    </div>
  )
}

export default PostList