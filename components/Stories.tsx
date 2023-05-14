import { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'
import Story from './Story';
interface User {
   id:number; userId: string; username: string; email: string; avatar: string; password: string; birthdate: Date; registeredAt: Date; 
}

const Stories = () => {
  const [suggestions, setSuggestions] = useState<User[]>([]);
  useEffect(() => {
    const suggestion = [...Array(20)].map((_, i) => ({
      id:i,
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    }));
    setSuggestions(suggestion);
  }, []);
  return (
    <div className='flex mt-8 space-x-2 p-6 bg-white border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
    {suggestions.map((profile)=>(
       <Story
       key={profile.id}
       img={profile.avatar}
       userName = {profile.username}
       />
  ))}
    </div>
  )
}

export default Stories