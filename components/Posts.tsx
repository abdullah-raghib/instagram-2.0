import React from 'react'
import Image from 'next/legacy/image'
import Post from './Post';
interface Post {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
}
function Posts() {
    const posts = [{
        id: "1",
        username: "abdullah.mars",
        userImg: "/profile.jpeg",
        img:"/post.JPG",
        caption:"Live Life as You Like !!",
    },{
      id: "2",
      username: "abdullah.mars",
      userImg: "/profile.jpeg",
      img:"/post.JPG",
      caption:"Live Life as You Like !!",
  },{
    id: "3",
    username: "abdullah.mars",
    userImg: "/profile.jpeg",
    img:"/post.JPG",
    caption:"Live Life as You Like !!",
},
];
  return (
    <div>
      {
        posts.map((post: Post)=> (
          <Post key={post.id} id={post.id} username={post.username} img={post.img} userImg={post.userImg} caption={post.caption} />
        ))
      }
    </div>
  )
}

export default Posts