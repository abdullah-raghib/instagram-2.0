import React, { useEffect, useState } from 'react'
import Image from 'next/legacy/image'
import { EllipsisHorizontalIcon, HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid"
import { HeartIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon, BookmarkIcon, FaceSmileIcon } from "@heroicons/react/24/outline"
import { DocumentData, QueryDocumentSnapshot, addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Moment from 'react-moment';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
//@ts-ignore
interface Props {
  id: string;
  username: string;
  img: string;
  userImg: string;
  caption: string;
}


function Post(props: Props) {
  // console.log(props.id, props.username, props.img, props.userImg);
  const { data: session } = useSession();
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
  const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  // For getting comments from firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'posts', props.id, 'comments'), orderBy('timestamp', 'desc')), (snapshot) => {
      setComments([...snapshot.docs])
    })
    return unsubscribe
  }, [db, props.id])

  // Getting Likes from firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts', props.id, 'likes'), (snapshot) => {
      setLikes(snapshot.docs)
    })
    return unsubscribe
  }, [db, props.id])

  // Getting Likes from firestore
  useEffect(
    () =>
      setHasLiked(
        //@ts-ignore
        likes.findIndex((like) => (like.id === session?.user?.uid)) !== -1
      ),
    [likes]
  );

  // Set Likes in firestore
  const likePosts = async () => {
    if (hasLiked) {
      //@ts-ignore
      await deleteDoc(doc(db, "posts", props.id, "likes", session?.user?.uid))
    } else {
      //@ts-ignore
      await setDoc(doc(db, "posts", props.id, "likes", session?.user?.uid), {
        //@ts-ignore
        username: session?.user?.username,
      });
    }
  }

  const sendComment = async (e: any) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment('')

    await addDoc(collection(db, 'posts', props.id, 'comments'), {
      comment: commentToSend,
      username: props.username,
      userImage: props.userImg,
      timestamp: serverTimestamp()
    });
  }

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
          {
            hasLiked ? (
              <HeartIconFilled onClick={likePosts} className='btn text-red-500' />
            ) : (

              <HeartIcon onClick={likePosts} className='btn' />
            )
          }
          <ChatBubbleOvalLeftIcon className='btn' />
          <PaperAirplaneIcon className='btn' />
        </div>
        <BookmarkIcon className='btn' />
      </div>
      { likes.length > 0 && (<p className='font-bold mx-2'>{likes.length} likes</p>)}
      {/* Caption */}
      <div>
        <p><span className='font-bold mx-2'>{props.username}</span>
          {props.caption}
        </p>
      </div>
      {/* Comments */}
      {
        comments.length > 0 && (
          <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
            {comments.map((comment, i) => (
              <div key={comment.id + i} className='flex items-center justify-between'>
                <div className='flex items-center space-x-2 mb-3'>
                  <img src={comment.data().userImage} alt="" className='h-7 rounded-full' />
                  <strong>{comment.data().username}</strong><span>{" "}</span>
                  <p>{comment.data().comment}</p>
                </div>
                <Moment fromNow className='text-sm text-gray-400 pr-5'>{comment.data()?.timestamp?.toDate()}</Moment>
              </div>
            ))}
          </div>

        )
      }
      {/* Input */}
      <div className='flex items-center p-2'>
        <FaceSmileIcon className='btn mr-1' />
        <input placeholder='Add a comment...' value={comment} onChange={(e: any) => setComment(e.target.value)} type="text" className='w-full border-none focus:ring-0 outline-none' />
        <button type='submit' disabled={!comment.trim()} onClick={sendComment} className='text-blue-600 font-semibold'>Post</button>
      </div>
    </div>
  )
}

export default Post