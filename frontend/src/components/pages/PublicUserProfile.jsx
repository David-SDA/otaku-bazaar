import React, { useEffect, useState } from 'react';
import AnnouncementCard from '../ui/announcement/AnnouncementCard';
import PublicUserProfileInfoSection from '../ui/publicUserProfile/PublicUserProfileInfoSection';
import LoadingAnimation from '../ui/general/LoadingAnimation'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UsersReportModal from '../ui/users/UsersReportModal';

export default function PublicUserProfile(){
    const { id } = useParams();
    const { isAuthenticated, user } = useAuth();
    if(isNaN(id) ||  id < 0){
        throw new Error();
    }

    const [profileUser, setProfileUser] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isReported, setReported] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        async function fetchUserData(){
            try{
                const response = await fetch(`http://localhost:8000/users/${id}`);
                if(!response.ok){
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setProfileUser(data);
                setAnnouncements(data.Announcements);

                if(isAuthenticated){
                    const reportResponse = await fetch(`http://localhost:8000/users/${user.sub}/reported`, {
                        credentials: 'include',
                    });

                    if(!reportResponse.ok){
                        throw new Error('Failed to fetch reported users');
                    }

                    const reportData = await reportResponse.json();
                    const alreadyReported = reportData.some((reportedUser) => reportedUser.id === parseInt(id));
                    setReported(alreadyReported);
                }
            }
            catch(error){
                console.error('Error fetching user data:', error);
            }
            finally{
                setLoading(false);
            }
        }

        fetchUserData();
    }, [id, isAuthenticated, user]);

    function toggleModal(){
        setModalOpen(!isModalOpen);
    }

    return (
        isLoading ? (
            <LoadingAnimation />
        ) : (
            <div className='flex flex-col'>
                <PublicUserProfileInfoSection user={profileUser} />
                <div>
                    <h2 className='text-xl font-bold mb-4'>User's Announcements</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 select-none place-items-center'>
                        {
                            announcements.length > 0 ? (
                                announcements.map((announcement) => (
                                    <AnnouncementCard key={announcement.id} announcement={announcement} user={profileUser} />
                                ))
                            ) : (
                                <p className='italic col-span-full'>No announcements yet...</p>
                            )
                        }
                    </div>
                </div>
                {
                    isAuthenticated && !isReported && user.sub !== parseInt(id) && (
                        <button onClick={toggleModal} className='bg-red-500 text-white py-2 px-4 rounded-xl w-fit font-bold hover:bg-red-600 mt-4'>Report User</button>
                    )
                }
            {
                isModalOpen && (
                    <UsersReportModal userId={id} onClose={toggleModal} setReported={setReported} />
                )
            }
            </div>
        )        
    );
}