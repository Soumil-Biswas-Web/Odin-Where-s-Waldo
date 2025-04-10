import React from 'react'
import Post from '../Components/Post';
import feedData from '../../assets/js/feedData';
import { Link } from 'react-router-dom';

export default function Feed() {

  const posts = feedData;

  return (
    <div className=''>
      {
        posts.map((post, index) => (
          <Link className="" key={index}>
            <Post post={post}/>
          </Link>
        ))
      }
    </div>
  )
}
