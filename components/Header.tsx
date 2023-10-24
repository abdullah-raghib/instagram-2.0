'use client';
import Image from 'next/legacy/image'
import React, { useEffect } from 'react'
import { HomeIcon } from "@heroicons/react/24/solid"
import profile from "./profile.jpeg"
import { MagnifyingGlassIcon, PaperAirplaneIcon, Bars3Icon, PlusCircleIcon, UserGroupIcon, HeartIcon } from "@heroicons/react/24/outline"
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtoms';
import { ToastContainer, toast } from 'react-toastify';

function Msg() {
  return (
    <div>
      <p>This feature is not integrated yet. Try <span className='font-bold'>upload pics, comment and like</span> 😎</p>
    </div>
  )
}

const Header = () => {
  const notify = () => toast.warn(Msg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState)
  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
    } else {
      router.push('/')

    }
  }, [session])


  function signOutFn() {
    useRouter().push('/auth/signin') // replace "/your-route" with the actual route you want to navigate to
  }

  return (
    <>
      {/* Warning Snackbar */}
      < ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className='sticky shadow-sm border-b top-0 bg-white z-50'>
        <div className='flex justify-between max-w-6xl items-center sm:mx-5 py-2 lg:m-auto'>
          {/* Left- Logo Section */}
          <div className='relative hidden lg:inline-grid h-10 w-32'>
            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/512px-Instagram_logo.svg.png" alt="img" layout="fill" objectFit="cover" />
          </div>
          <div className='relative lg:hidden h-10 w-10 shrink-0 ml-1'>
            <Image src="https://links.papareact.com/jjm" alt="img" layout="fill" objectFit='contain' />
          </div>

          {/* Middle- Search Section */}
          <div className='max-w-xs'>
            <div className='relative rounded-md'>
              <div onClick={notify} className='absolute inset-y-0 flex items-center pl-3 '>
                <MagnifyingGlassIcon className="h-5 w-5" />
              </div>
              <input onKeyDown={(e) => { if (e.keyCode === 13) { notify(); } }} className='bg-gray-50 block pl-10 w-full border-gray-300 focus:ring-black focus:border-black sm:text-sm rounded-md' type="text" />
            </div>
          </div>

          {/** Right */}
          <div className='flex justify-center items-center'>
            <HomeIcon className="navBtn" />
            <PlusCircleIcon onClick={() => setOpen(true)} className='w-8 sm:mr-0 mr-2' />
            {session ? (
              <>
                <div className='relative navBtn'>
                  <PaperAirplaneIcon onClick={notify} className='navBtn rotate-[-45deg]' />
                  <div className='absolute -top-1 right-2 rounded-full w-4 h-4 animate-pulse text-sm flex justify-center items-center bg-red-600'>3</div>
                </div>
                <UserGroupIcon onClick={notify} className='navBtn' />
                <HeartIcon onClick={notify} className='navBtn' />
                <Image onClick={signOut as any} src={session.user?.image!} width="30" height="30" className='cursor-pointer rounded-full w-2 h-2' alt="profile-pic" />
              </>
            ) : (
              <>
                <Link href={"/auth/signin"}>
                  <button>Sign In</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Header