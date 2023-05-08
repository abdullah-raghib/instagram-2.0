import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useSession } from 'next-auth/react';
import React, { Fragment, RefObject, useRef, useState } from 'react'
import { useRecoilState, } from 'recoil'
import { modalState } from '../atoms/modalAtoms'
import { db, storage } from '../firebase';

function Modal() {
  // useSession
  const { data: session } = useSession() as any;

  //store
  const [open, setOpen] = useRecoilState(modalState);

  // useRefs
  const filePickerRef = useRef<HTMLInputElement>(null);
  const captionRef = useRef<HTMLTextAreaElement>(null);

  //useState
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(null);
  const [loading, setLoading] = useState(false);

  const uploaded = filePickerRef.current ? true : false;

  // function to open file explorer to add select the image
  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (!(e.target as HTMLInputElement)!.files![0]) return null;
    reader.readAsDataURL((e.target as HTMLInputElement)!.files![0]);

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent!.target!.result!);
    }
  }

  // function to add data in firestore
  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);
    // 1) Create a post and add to the firestore 'posts' collection
    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: captionRef.current!.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp()
    })

    // 2) get the post Id for the newly created post
    // console.log("docRef Id", docRef.id);

    // 3) Upload the image to the firebase storage with the post Id
    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    // 4) Get a download url from fb storage and update the original post with image
    const snapshot = await uploadString(imageRef, selectedFile as string, "data_url").then( async (snapshot) => {
      const downloadUrl = await getDownloadURL(imageRef)

      await updateDoc(doc(db, 'posts', docRef.id), {image: selectedFile});
    });
    setLoading(false)
    setOpen(false);
    setSelectedFile(null);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => setOpen(false)}
      >
        <div className='flex justify-end items-center min-h-[1000px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            enter="transition duration-300 ease-out"
            enterFrom=" opacity-0"
            enterTo=" opacity-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as={Fragment}
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity"></Dialog.Overlay>
          </Transition.Child>
          {/* This element is to trick the browser to centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden="true"
          >
            @#8203;
          </span>
          <Transition.Child
            enter="duration-300 ease-out"
            enterFrom=" opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo=" opacity-100 translate-y-0 sm:scale-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            as={Fragment}
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div className='mb-8'>

                {selectedFile ? (
                  <img src={selectedFile as string} alt=""
                    className='w-full object-contain cursor-pointer' onClick={() => setSelectedFile(null)} />
                ) : (
                  <div onClick={() => filePickerRef!.current!.click()} className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 cursor-pointer">
                    <CameraIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                )}
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    {uploaded ? "Photo Uploaded successfully" : "Create a new Post"}
                  </Dialog.Title>
                  <div>
                    <input type="file"
                      ref={filePickerRef}
                      hidden
                      onChange={addImageToPost} />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Upload Your Pics to the community to reach fame among friends and family.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                <label htmlFor="name" className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900">Caption</label>
                <textarea name="name" ref={captionRef} id="name" className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm" placeholder="Write your caption ....." />
              </div>
              <div className="mt-8 sm:mt-6">
                <button onClick={uploadPost} disabled={!selectedFile} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent sehadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white
                 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                  Upload a Photo
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog >
    </Transition.Root >
  )

}

export default Modal