import React from 'react';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../../utils/dateUtils';

export default function UsersTable({users}){
    return (
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
                        users.data.map((user, index) => (
                            <tr key={user.id} className='even:bg-gray-100'>
                                <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>
                                    <Link to={`/profile/${user.id}`} className='underline'>{user.username}</Link>
                                </td>
                                <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>{timeAgo(user.createdAt)}</td>
                                <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48 space-x-2'>
                                    <button className='bg-primary font-bold py-2 px-4 rounded w-28 hover:scale-105 transition-all duration-300'>
                                        {
                                            user.role === 'moderator' ? 'Demote' : 'Promote'
                                        }
                                    </button>
                                    <button className='bg-red-500 font-bold py-2 px-4 rounded w-24 hover:scale-105 transition-all duration-300'>
                                        {
                                            user.isBanned ? 'Unban' : 'Ban'
                                        }
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}