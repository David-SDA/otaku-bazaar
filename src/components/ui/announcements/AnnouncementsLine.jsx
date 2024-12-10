import React from 'react';
import AnnouncementCard from '../announcement/AnnouncementCard';
import AnnouncementsSeeMoreCard from './AnnouncementsSeeMoreCard';

export default function AnnouncementsLine(){
    return (
        <div className='flex gap-x-6 pb-4 mb-2 overflow-x-scroll select-none [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#F7EDE2] [&::-webkit-scrollbar-track]:shadow-inner [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary'>
            {
                Array.from({length: 9}).map((_, index) => (
                    <AnnouncementCard key={index} />
                ))
            }
            <AnnouncementsSeeMoreCard link={'/'} />
        </div>
    )
}
