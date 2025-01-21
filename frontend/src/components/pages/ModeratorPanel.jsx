import React, { useEffect, useState } from 'react';
import AnnouncementsReportedTable from '../ui/announcements/AnnouncementsReportedTable';
import LoadingAnimation from '../ui/general/LoadingAnimation';

export default function ModeratorPanel(){
    const [reportedAnnouncements, setReportedAnnouncements] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchModeratorPanel(){
            try{
                const response = await fetch('http://localhost:8000/announcements/reported', {credentials: 'include'});
                if(!response.ok){
                    throw new Error('Failed to fetch reported announcements');
                }
                const data = await response.json();
                setReportedAnnouncements(data);
            }
            catch(error){
                console.error('Error fetching moderator panel:', error);
            }
            finally{
                setLoading(false);
            }
        }
        
        fetchModeratorPanel();
    }, [])

    return (
        <>
            {
                isLoading ? (
                    <LoadingAnimation />
                ) : (
                    <>
                        <h1 className='text-center text-xl lg:text-2xl font-bold mb-5'>Moderator Panel</h1>
                        <h2 className='text-xl font-bold mb-3'>Reported Announcements</h2>
                        <AnnouncementsReportedTable reportedAnnouncements={reportedAnnouncements} />
                    </>
                )
            }
        </>
    );
}