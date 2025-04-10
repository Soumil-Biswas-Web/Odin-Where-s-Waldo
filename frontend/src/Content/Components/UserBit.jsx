import React from 'react'

export default function UserBit({user}) {
  return (
    <div className='flex items-center gap-4'>
        <img 
          className='w-10 border-2 border-contrast-color rounded-full'
          src={user.profilePicture} 
          alt={user.name + "Pic"} 
        />
        <p className='font-bold'>{user.name}</p>
    </div>
  )
}
