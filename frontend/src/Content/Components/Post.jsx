import React from 'react'
import UserBit from './UserBit'
import PostNumbserSection from './PostNumbserSection'

export default function Post({post}) {
  return (
    <div className="p-3 border-b-[1px] border-contrast-color-offset">
        <UserBit user={post.user} />

        <div className='ml-14'>
          <p>{post.text}</p>

          {post.image && (
              <img className='magic-border' src={post.image} alt={post.id+"img"} />
          )}
        </div>

        <PostNumbserSection item={post}/>
    </div>
  )
}
