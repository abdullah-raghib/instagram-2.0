import React from 'react'
// import Image from 'next/legacy/image'
interface StoryType {
  img: string;
  userName: string;
}

const Story = (props: StoryType) => {
  return (
    <div className=''>
    <img src={ props.img } alt="profile icon" className='w-14 h-14 rounded-full border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition ease-out' width="100" height="100"/>
    <p className='w-14 truncate text-sm'>{props.userName}</p>
    </div>
  )
}

export default Story
