import React, { useEffect, useState } from 'react';
import AnnouncementCard from '../ui/announcement/AnnouncementCard';
import PublicUserProfileInfoSection from '../ui/publicUserProfile/PublicUserProfileInfoSection';
import LoadingAnimation from '../ui/general/LoadingAnimation'
import { useParams } from 'react-router-dom';

export default function PublicUserProfile(){
    const { id } = useParams();
    if(isNaN(id) ||  id < 0){
        throw new Error();
    }

    const [user, setUser] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserData(){
            try{
                const response = await fetch(`http://localhost:8000/users/${id}`);
                if(!response.ok){
                    throw new Error('Failed to fetch user data');
                }
    
                const data = await response.json();
                setUser(data);
                setAnnouncements(data.Announcements)
            }
            catch(error){
                console.error('')
            }
            finally{
                setLoading(false)
            }
        }

        fetchUserData();
    }, [id])

    return (
        isLoading ? (
            <LoadingAnimation />
        ) : (
            <div className='flex flex-col'>
                <PublicUserProfileInfoSection user={user} />
                <div>
                    <h2 className='text-xl font-bold mb-4'>User's Announcements</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 select-none place-items-center'>
                        {
                            announcements.length > 0 ? (
                                announcements.map((announcement) => (
                                    <AnnouncementCard key={announcement.id} announcement={announcement} user={user} />
                                ))
                            ) : (
                                <p className='text-center col-span-full'>No announcements available</p>
                            )
                        }
                    </div>
                </div>
            </div>
        )        
    );
}