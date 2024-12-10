import React from 'react';
import AnnouncementCard from '../ui/announcement/AnnouncementCard';
import PublicUserProfileInfoSection from '../ui/publicUserProfile/PublicUserProfileInfoSection';

export default function PublicUserProfile(){
    return (
        <div className='flex flex-col'>
            <PublicUserProfileInfoSection />
            <div>
                <h2 className='text-xl font-bold mb-4'>User's Announcements</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 select-none place-items-center'>
                    {
                        Array.from({length: 4}, (_, index) => (
                            <AnnouncementCard key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}