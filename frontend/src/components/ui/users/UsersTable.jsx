import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../../utils/dateUtils';
import LoadingAnimation from '../general/LoadingAnimation';
import AdminModeratorConfirmationModal from '../panels/AdminModeratorConfirmationModal';

export default function UsersTable({users}){
    const [allUsers, setAllUsers] = useState(users);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState({});
    const [isLoading, setLoading] = useState(false);
    
    async function handleRoleChange(userId, newRole){
        setLoading(true);
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole }),
                credentials: 'include',
            });
            if(!response.ok){
                throw new Error('Failed to update user role');
            }

            const updatedUsers = users.map((user) =>
                user.id === userId ? { ...user, role: newRole } : user
            );
            
            setAllUsers(updatedUsers);
        }
        catch(error){
            console.error('Error changing user role:', error.message);
        }
        finally{
            setLoading(false);
        }
    }

    async function handleBanToggle(userId, isBanned){
        setLoading(true);
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isBanned: !isBanned }),
                credentials: 'include',
            });

            if(!response.ok){
                throw new Error('Failed to ban/unban user');
            }

            const updatedUsers = users.map((user) =>
                user.id === userId ? { ...user, isBanned: !isBanned } : user
            );
            setAllUsers(updatedUsers);
        }
        catch(error){
            console.error('Error banning/unbanning user:', error.message);
        }
        finally{
            setLoading(false);
        }
    }

    function openModal(action, user){
        setModalAction({ action, user });
        setModalOpen(true);
    }

    function handleModalClose(){
        const { action, user } = modalAction;
        setModalOpen(false);

        if(action === 'roleChange'){
            const newRole = user.role === 'moderator' ? 'user' : 'moderator';
            handleRoleChange(user.id, newRole);
        }
        else if(action === 'ban'){
            handleBanToggle(user.id, user.isBanned);
        }
    }

    return (
        <>
            <div className='overflow-x-auto mb-5'>
                <table className='w-full table-auto border-collapse border'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='border border-gray-300 p-2 min-w-48'>User</th>
                            <th className='border border-gray-300 p-2 min-w-48'>Created at</th>
                            <th className='border border-gray-300 p-2 min-w-48'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            allUsers.map((user, index) => (
                                <tr key={`${user.id}-${index}`} className='even:bg-gray-100'>
                                    <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>
                                        <Link to={`/profile/${user.id}`} className='underline'>
                                            {user.username}
                                        </Link>
                                    </td>
                                    <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>
                                        {timeAgo(user.createdAt)}
                                    </td>
                                    <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48 space-x-2'>
                                        {
                                            isLoading ? (
                                                <LoadingAnimation />
                                            ) : (
                                                <>
                                                    <button onClick={() => openModal('roleChange', user)} className='bg-primary font-bold py-2 px-4 rounded w-28 hover:scale-105 transition-all duration-300'>
                                                        {user.role === 'moderator' ? 'Demote' : 'Promote'}
                                                    </button>
                                                    <button onClick={() => openModal('ban', user)} className={`font-bold py-2 px-4 rounded w-24 ${user.isBanned ? 'bg-green-300' : 'bg-red-500'} hover:scale-105 transition-all duration-300`}>
                                                        {user.isBanned ? 'Unban' : 'Ban'}
                                                    </button>
                                                </>
                                            )
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <AdminModeratorConfirmationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onConfirm={() => handleModalClose()} title='Are you sure?' />
        </>
    )
}