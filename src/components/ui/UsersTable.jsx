import React from 'react';
import { Link } from 'react-router-dom';

export default function UsersTable(){
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
                        Array.from({length: 5}, (_, index) => (
                            <tr key={index} className='even:bg-gray-100'>
                                <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>
                                    <Link to={'/profile/2'} className='underline'>User</Link>
                                </td>
                                <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>date</td>
                                <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48 space-x-2'>
                                    <button className='bg-primary font-bold py-2 px-4 rounded w-28'>
                                        {
                                            index % 2 === 0 ? 'Demote' : 'Promote'
                                        }
                                    </button>
                                    <button className='bg-red-500 font-bold py-2 px-4 rounded w-24'>
                                        {
                                            index % 2 === 0 ? 'Ban' : 'Unban'
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