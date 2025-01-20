import React, { useEffect, useState } from 'react';
import AnnouncementCard from '../ui/announcement/AnnouncementCard';
import LoadingAnimation from '../ui/general/LoadingAnimation';

export default function Wishlist(){
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setLoading] = useState(true);

    async function fetchWishlist(){
        try {
            const response = await fetch('http://localhost:8000/users/wishes', { credentials: 'include' });
            if(!response.ok){
                throw new Error('Failed to fetch wishlist');
            }

            const data = await response.json();
            setAnnouncements(data);
            setLoading(false);
        }
        catch(error){
            console.error('Error fetching wishlist:', error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWishlist();
    }, []);

    return (
        <>
            <>
                <h1 className='text-center text-xl lg:text-2xl font-bold mb-5'>Your Wishlist</h1>
                {
                    isLoading ? (
                        <LoadingAnimation />
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 select-none place-items-center'>
                            {
                                announcements.length !== 0 ? (
                                    announcements.map((announcement) => (
                                        <AnnouncementCard key={announcement.id} announcement={announcement} />
                                    ))
                                ) : (
                                    <p className='italic'>Your wishlist is empty...</p>
                                )
                            }
                        </div>
                    )
                }
            </>
        </>
    )
}