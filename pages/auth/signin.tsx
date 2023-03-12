import React, { useEffect } from 'react'
import { ClientSafeProvider, getProviders, LiteralUnion, signIn as SignIntoProvider, useSession } from "next-auth/react"
import { BuiltInProviderType } from 'next-auth/providers'
import Header from '../../components/Header'
import Image from 'next/legacy/image'
import Login from '../../components/Login'
import { useRouter } from 'next/router'

type Providers = { providers: Promise<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null> }
function signIn(props: Providers) {
  const router = useRouter();
  const { data: session } = useSession() as any;
  useEffect(() => {
      console.log(session, "session ");
      if (session) router.push('/');
    
  }, [session])
  return (
    <div className='bg-gray-50'>
      {/* <Header /> */}
      <div className='flex justify-center items-center h-screen'>
        <div>
          <Image src={"/SignInMobile.png"} width="400" height={600} />
        </div>
        <div className='w-[22rem] h-[35rem] bg-white border-gray-200 border ml-2 flex flex-col items-center rounded-sm'>
          <div className=''>
            <Image src="https://links.papareact.com/ocw" alt="img" objectFit="contain" width="200" height="200" />
          </div>
          {/* Form */}
          <div className='space-y-3 flex items-center flex-col'>
            <input className='input' type="text" placeholder='Phone number, username, or email' />
            <input className='input' type="password" placeholder='password' />
            <div className='flex items-start w-full'>
              <label className='text-sm text-gray-900'>
                <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox" className="focus:ring-white h-4 w-4 text-indigo-600 border-gray-300 rounded mr-5 text-left" />Save Login Info              </label>
            </div>
            <button className='bg-blue-400 text-white rounded-md w-full py-1'>Log in</button>
          </div>
          {
            Object.values(props.providers).map((provider) => (
              <div key={provider.name}>
                <button className='bg-red-500 mt-3 text-white py-1 w-72 border rounded-md' onClick={() => SignIntoProvider(provider.id, {callbackUrl: "/"})}>
                  Sign in with {provider.name}
                </button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    }
  }
}
export default signIn