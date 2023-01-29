import React from 'react'
import Image from 'next/legacy/image'
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid"
import { HeartIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon, BookmarkIcon, FaceSmileIcon } from "@heroicons/react/24/outline"


function Post(props) {
  console.log(props.id, props.username, props.img, props.userImg);
  return (
    <div className='bg-white border rounded-sm my-7'>
      {/* Header */}
      <div className='flex p-5 items-center'>
        <div className='w-12 h-12  p-1 mr-3'>
          <Image src={props.userImg} alt="userImage" width="60" height="60" className='rounded-full border' />
        </div>
        <p className='flex-1 font-bold'>{props.username}</p>
        <EllipsisHorizontalIcon width="20" height={20} />
      </div>
      {/* img */}
      <div>
        <Image src={props.img} width="1200" height="700" className='object-cover w-full' />
      </div>
      {/* Buttons */}
      <div className='flex justify-between m-2 '>
        <div className='flex space-x-4'>
          <HeartIcon className='btn' />
          <ChatBubbleOvalLeftIcon className='btn' />
          <PaperAirplaneIcon className='btn' />
        </div>
        <BookmarkIcon className='btn' />
      </div>
      {/* Caption */}
      <div>
        <p><span className='font-bold mx-2'>{props.username}</span>
          {props.caption}
        </p>
      </div>
      {/* Comments */}
      {/* Input */}
      <div className='flex items-center p-2'>
        <FaceSmileIcon className='btn mr-1' />
        <input placeholder='Add a comment...' type="text" className='w-full border-none focus:ring-0 outline-none' />
        <button className='text-blue-600 font-semibold'>Post</button>
      </div>
    </div>
  )
}

export default Post