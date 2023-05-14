import React, { useEffect } from 'react'
import Image from 'next/legacy/image'
import { signOut, useSession } from 'next-auth/react';
import { Router, useRouter } from 'next/router';

const MiniProfile = () => {
  const router = useRouter();
  const { data: session } = useSession() as any;

  return (
    <div className='flex mt-14 w-full space-x-4'>
      <div>
        <Image src={session?.user?.image} width="60" height="60" className='rounded-full border p-[2px]' alt="profile-pic" />
      </div>
      <div>
        <b>{session?.user?.username}</b>
        <p className='text-gray-800'>Abdullah Raghib Siddiqui</p>
      </div>
      <button onClick={() => signOut} className='btn text-blue-400 px-1 mt-2'>
        Sign Out
      </button>
    </div>
  )
}

export default MiniProfile