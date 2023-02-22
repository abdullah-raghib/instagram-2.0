import Image from 'next/legacy/image'
import React from 'react'
import { HomeIcon } from "@heroicons/react/24/solid"
import profile from "./profile.jpeg"
import { MagnifyingGlassIcon, PaperAirplaneIcon, Bars3Icon, PlusCircleIcon, UserGroupIcon, HeartIcon } from "@heroicons/react/24/outline"
import { useSession } from 'next-auth/react'

const Header = () => {
  const { data: session } = useSession();
  console.log(session);

  function signIn (){

  }

  function signOut () {

  }

  return (
    <div className='sticky shadow-sm border-b top-0 bg-white z-50'>
      <div className='flex justify-between max-w-6xl items-center mx-5 lg:m-auto'>
        {/* Left- Logo Section */}
        <div className='relative hidden lg:inline-grid h-20 w-20'>
          <Image src="https://links.papareact.com/ocw" alt="img" layout="fill" objectFit="contain" />
        </div>
        <div className='relative lg:hidden h-10 w-10 shrink-0'>
          <Image src="https://links.papareact.com/jjm" alt="img" layout="fill" objectFit='contain' />
        </div>
        {/* Middle- Search Section */}
        <div className='max-w-xs'>
          <div className='relative mt-1 pt-3 rounded-md'>
            <div className='absolute inset-y-0 flex items-center pl-3 pt-2 pointer-events-none'>
              <MagnifyingGlassIcon className="h-5 w-5" />
            </div>
            <input className='bg-gray-50 block pl-10 w-full border-gray-300 focus:ring-black focus:border-black sm:text-sm rounded-md' type="text" />
          </div>
        </div>

        {/** Right */}
        <div className='mt-3 flex justify-center items-center'>
          <HomeIcon className="navBtn" />
          <Bars3Icon className='w-8 md:hidden' />
          { session ?(
            <>
          <div className='relative navBtn'>
            <PaperAirplaneIcon className='navBtn rotate-[-45deg]' />
            <div className='absolute -top-1 right-2 rounded-full w-4 h-4 animate-pulse text-sm flex justify-center items-center bg-red-600'>3</div>
          </div>
          <PlusCircleIcon className='navBtn' />
          <UserGroupIcon className='navBtn' />
          <HeartIcon className='navBtn' />
          <Image onClick={signOut}  src={session.user?.image!} width="30" height="30" className='rounded-full w-2 h-2' alt="profile-pic" />
          </>
          ):(
          <><button onClick={signIn}>Sign In</button></>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header