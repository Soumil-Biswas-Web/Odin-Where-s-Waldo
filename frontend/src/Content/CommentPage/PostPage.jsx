import React from 'react'
import Post from '../Components/Post'
import Comment from './components/Comment'

export default function PostPage({post}) {
  return (
    <div className="" key={index}>
      <Post post={post}/>
      {
        post.comments.map((comment, index) => (
          <Comment comment={comment} key={index}/>
        ))
      }
    </div>
  )
}
