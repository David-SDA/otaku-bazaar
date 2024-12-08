import React from 'react';
import AnnounceCard from '../ui/AnnounceCard';
import PublicUserInfoSection from '../ui/PublicUserInfoSection';

export default function PublicUserProfile(){
    return (
        <div className='flex flex-col'>
            <PublicUserInfoSection />
            <div>
                <h2 className='text-xl font-bold mb-4'>User's Announcements</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 select-none place-items-center'>
                    {
                        Array.from({length: 4}, (_, index) => (
                            <AnnounceCard key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}