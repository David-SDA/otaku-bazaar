import React, { useEffect, useState } from 'react';
import AnnouncementCard from '../announcement/AnnouncementCard';
import AnnouncementsSeeMoreCard from './AnnouncementsSeeMoreCard';
import LoadingAnimation from '../general/LoadingAnimation';

export default function AnnouncementsLine({categoryId}){
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/announcements?${categoryId ? `categoryId=${categoryId}` : ''}&limit=10&sortDate=desc`);
                if(!response.ok){
                    throw new Error('Failed to fetch announcements');
                }
                const data = await response.json();
                setAnnouncements(data);
            }
            catch (error){
                console.error('Error fetching announcements:', error);
            }
            finally{
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, [categoryId]);

    return (
        <div className='flex gap-x-6 pb-4 mb-2 overflow-x-scroll select-none [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#F7EDE2] [&::-webkit-scrollbar-track]:shadow-inner [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary'>
            {
                isLoading ? (
                    <LoadingAnimation />
                ) : (
                    announcements.map((announcement) => (
                        !announcement.isHidden && <AnnouncementCard key={announcement.id} announcement={announcement} user={announcement.User} />
                    ))
                )
            }
            <AnnouncementsSeeMoreCard link={'/search'} />
        </div>
    )
}
