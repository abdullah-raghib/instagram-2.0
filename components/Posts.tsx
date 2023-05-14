import React, { useEffect, useState } from 'react'
import Image from 'next/legacy/image'
import Post from './Post';
import { DocumentData, QueryConstraint, QueryDocumentSnapshot, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
interface Post {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
}

function Posts() {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
      setPosts(snapshot.docs);
    })
 return unsubscribe;
  }, [db])

  return (
    <div>
      {
        posts.map((post: any) => (
          <Post key={post.data().id} id={post.id} username={post.data().username} img={post.data().image}
           userImg={post.data().profileImg} caption={post.data().caption} />
        ))
      }
    </div>
  )
}

export default Posts