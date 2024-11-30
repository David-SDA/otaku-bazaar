import React from 'react';
import AnnounceCard from './AnnounceCard';
import SeeMoreCard from './SeeMoreCard';

export default function AnnouncesLine(){
    return (
        <div className='flex pb-4 mb-2 overflow-x-scroll select-none [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#F7EDE2] [&::-webkit-scrollbar-track]:shadow-inner [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary'>
            {
                Array.from({length: 9}).map((_, index) => (
                    <AnnounceCard key={index} />
                ))
            }
            <SeeMoreCard link={'/'} />
        </div>
    )
}
