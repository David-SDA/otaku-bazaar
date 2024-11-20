import React from 'react'
import AnnounceCard from './AnnounceCard'

export default function AnnounceLine(){
    return (
        <div className='flex pb-3 overflow-x-scroll [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300'>
            <AnnounceCard />
            <AnnounceCard />
            <AnnounceCard />
            <AnnounceCard />
            <AnnounceCard />
            <AnnounceCard />
            <AnnounceCard />
            <AnnounceCard />
        </div>
    )
}
