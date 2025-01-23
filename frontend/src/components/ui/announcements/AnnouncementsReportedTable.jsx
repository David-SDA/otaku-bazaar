import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingAnimation from '../general/LoadingAnimation';
import AdminModeratorConfirmationModal from '../panels/AdminModeratorConfirmationModal';

export default function AnnouncementsReportedTable({reportedAnnouncements}){
    const [announcements, setAnnouncements] = useState(reportedAnnouncements);
    const [isLoading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState({});

    async function handleHideToggle(announcementId, isHidden){
        setLoading(true);
        try{
            const response = await fetch(`http://localhost:8000/announcements/${announcementId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isHidden: !isHidden }),
                credentials: 'include'
            });
            if(!response.ok){
                throw new Error('Failed to hide announcement');
            }
            
            const updatedAnnouncements = announcements.map((announcement) => {
                if(announcement.id === announcementId){
                    return {...announcement, isHidden: !isHidden};
                }
                return announcement;
            })
            setAnnouncements(updatedAnnouncements);
        }
        catch(error){
            console.error('Error hiding announcement:', error);
        }
        finally{
            setLoading(false);
        }
    }

    async function handleDelete(announcementId){
        setLoading(true);
        try{
            const response = await fetch(`http://localhost:8000/announcements/${announcementId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if(!response.ok){
                throw new Error('Failed to delete announcement');
            }

            const updatedAnnouncements = announcements.filter((announcement) => announcement.id !== announcementId);
            setAnnouncements(updatedAnnouncements);
        }
        catch(error){
            console.error('Error deleting announcement:', error);
        }
        finally{
            setLoading(false);
        }
    }

    async function handleResolved(userId, announcementId){
        setLoading(true);
        try{
            const response = await fetch(`http://localhost:8000/users/${userId}/reportedAnnouncements/${announcementId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if(!response.ok){
                throw new Error('Failed to resolve announcement');
            }
            
            const updatedAnnouncements = announcements.filter((announcement) => announcement.id !== announcementId);
            setAnnouncements(updatedAnnouncements);
        }
        catch(error){
            console.error('Error resolving announcement:', error);
        }
        finally{
            setLoading(false);
        }
    }

    function openModal(action, announcement, userId){
        setModalAction({action, announcement, userId});
        setModalOpen(true);
    }

    function handleModalClose(){
        const { action, announcement, userId } = modalAction;
        setModalOpen(false);

        if(action === 'hide'){
            handleHideToggle(announcement.id, announcement.isHidden);
        }
        else if(action === 'delete'){
            handleDelete(announcement.id);
        }
        else if(action === 'resolve'){
            handleResolved(userId, announcement.id);
        }
    }

    return (
        <>
            <div className='overflow-x-auto mb-5'>
                <table className='w-full table-auto border-collapse border'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='border border-gray-300 p-2 min-w-48'>Title</th>
                            <th className='border border-gray-300 p-2 min-w-48'>Reported by</th>
                            <th className='border border-gray-300 p-2 min-w-48'>Reason</th>
                            <th className='border border-gray-300 p-2 min-w-48'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            announcements.map((announcement) => (
                                announcement.reportedBy.map((report, index) => (
                                    <tr key={`${announcement.id}-${index}`} className='even:bg-gray-100'>
                                        <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>
                                            <Link to={`/announcements/${announcement.id}`} className='underline'>{announcement.title}</Link>
                                        </td>
                                        <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>
                                            <Link to={`/profile/${report.id}`} className='underline'>{report.username}</Link>
                                        </td>
                                        <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>{report.reportedAnnouncements.reason}</td>
                                        <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48 space-x-2'>
                                            {
                                                isLoading ? (
                                                    <LoadingAnimation />
                                                ) : (
                                                    <>
                                                        <button onClick={() => openModal('hide', announcement)} className='bg-primary font-bold py-2 px-4 rounded w-24 hover:scale-105 transition-all duration-300'>
                                                            {announcement.isHidden ? 'Unhide' : 'Hide'}
                                                        </button>
                                                        <button onClick={() => openModal('delete', announcement)} className='bg-red-500 font-bold py-2 px-4 rounded hover:scale-105 transition-all duration-300'>
                                                            Delete
                                                        </button>
                                                        <button onClick={() => openModal('resolve', announcement, report.id)} disabled={announcement.isHidden} className={`bg-green-300 font-bold py-2 px-4 rounded hover:scale-105 transition-all duration-300 ${announcement.isHidden ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                                            Resolved
                                                        </button>
                                                    </>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <AdminModeratorConfirmationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onConfirm={handleModalClose} title={'Are you sure?'} />
        </>
    )
}