import React from 'react'
import PostNumbserSection from '../../Components/PostNumbserSection'

export default function Comment({comment}) {
  return (
    <div>

        <p>{comment.text}</p>

        <PostNumbserSection item={comment}/>
    </div>
  )
}
