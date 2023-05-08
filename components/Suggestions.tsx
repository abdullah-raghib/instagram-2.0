import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'


const Suggestions = () => {
  const [suggestions, setSuggestions] = useState<{ avatar: string; userName: string; mutual: string; }[]>([])
  useEffect(() => {
    const suggesArr = [...Array(5)].map((_, i) => ({
      avatar: faker.image.avatar(),
      userName: faker.internet.userName(),
      mutual: faker.internet.userName()
    }))
    setSuggestions(suggesArr);

  }, [])
  // console.log(suggestions);
  return (
    <div>
      <div className='flex justify-between'>
        <p className='text-gray-500'>Suggestions for you</p>
        <p className='text-gray-700'>See All</p>
      </div>
      {suggestions.map((suggestion, i) => (
        <div key={i} className="flex justify-between items-center">
          <div className='flex'>
            <img src={suggestion.avatar} className="h-14 w-14 rounded-full border p-[2px]" alt="image" />
            <div>
              <div>
                <b>@{suggestion.userName}</b>
              </div>
              <div className='w-40 truncate text-sm text-gray-400'>
                <p>Followed by {suggestion.mutual}</p>
              </div>
            </div>
          </div>
          <div className='text-sm text-blue-400'>
            Follow
          </div>
        </div>
      ))}
    </div>
  )
}

export default Suggestions