import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingAnimation from '../general/LoadingAnimation';
import AdminModeratorConfirmationModal from '../panels/AdminModeratorConfirmationModal';

export default function UsersReportedTable({reportedUsers}){
    const [users, setUsers] = useState(reportedUsers);
    const [isLoading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState({});

    async function handleResolved(userId, reportId){
        setLoading(true);
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${reportId}/reportedUsers/${userId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if(!response.ok){
                throw new Error('Failed to resolve user report');
            }

            const updatedUsers = users.filter((user) => user.id !== userId);
            setUsers(updatedUsers);
        }
        catch(error){
            console.error('Error resolving user report:', error);
        }
        finally{
            setLoading(false);
        }
    }

    function openModal(action, user, reportId){
        setModalAction({action, user, reportId});
        setModalOpen(true);
    }

    function handleModalClose(){
        const { action, user, reportId } = modalAction;
        setModalOpen(false);

        if(action === 'resolve'){
            handleResolved(user.id, reportId);
        }
    }

    return (
        <>
            <div className='overflow-x-auto mb-5'>
                <table className='w-full table-auto border-collapse border'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='border border-gray-300 p-2 min-w-48'>User</th>
                            <th className='border border-gray-300 p-2 min-w-48'>Reported by</th>
                            <th className='border border-gray-300 p-2 min-w-48'>Reason</th>
                            <th className='border border-gray-300 p-2 min-w-48'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => (
                                user.reported.map((report, index) => (
                                    <tr key={`${user.id}-${index}`} className='even:bg-gray-100'>
                                        <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>
                                            <Link to={`/profile/${user.id}`} className='underline'>{user.username}</Link>
                                        </td>
                                        <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>
                                            <Link to={`/profile/${report.id}`} className='underline'>{report.username}</Link>
                                        </td>
                                        <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>{report.reportedUsers.reason}</td>
                                        <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48 space-x-2'>
                                            {
                                                isLoading ? (
                                                    <LoadingAnimation />
                                                ) : (
                                                    <button onClick={() => openModal('resolve', user, report.id)} disabled={user.isBanned} className={`bg-green-300 font-bold py-2 px-4 rounded hover:scale-105 transition-all duration-300 ${user.isBanned ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                                        Resolved
                                                    </button>
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
            <AdminModeratorConfirmationModal isOpen={modalOpen} onClose={() =>setModalOpen(false)} onConfirm={handleModalClose} title={'Are you sure?'} />
        </>
    )
}