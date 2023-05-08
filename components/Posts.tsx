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
// const posts = [{
//   id: "1",
//   username: "abdullah.mars",
//   userImg: "/profile.jpeg",
//   img: "/post.JPG",
//   caption: "Live Life as You Like !!",
// }, {
//   id: "2",
//   username: "abdullah.mars",
//   userImg: "/profile.jpeg",
//   img: "/post.JPG",
//   caption: "Live Life as You Like !!",
// }, {
//   id: "3",
//   username: "abdullah.mars",
//   userImg: "/profile.jpeg",
//   img: "/post.JPG",
//   caption: "Live Life as You Like !!",
// },
// ];
function Posts() {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
      setPosts(snapshot.docs);
    })
 return unsubscribe;
  }, [db])

  // console.log(posts);

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