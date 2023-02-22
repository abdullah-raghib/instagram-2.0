import React from 'react'
import Image from 'next/legacy/image'

const MiniProfile = () => {
  return (
    <div className='flex mt-14 w-full space-x-4'>
        <div>
        <Image src={ "/profile.jpeg" } width="60" height="60" className='rounded-full border p-[2px]' alt="profile-pic" />
        </div>
        <div>
          <b>abdullah.mars</b>
          <p className='text-gray-800'>Abdullah Raghib Siddiqui</p>
        </div>
        <button className='btn text-blue-400 px-1 mt-2'>
          Sign Out
        </button>
    </div>
  )
}

export default MiniProfile