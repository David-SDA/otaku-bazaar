import React from 'react';
import { Link } from 'react-router-dom';

export default function AnnouncementsReportedTable(){
    return (
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
                        Array.from({length: 5}, (_, index) => (
                            <tr key={index} className='even:bg-gray-100'>
                                <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>
                                    <Link to={'/announcements/2'} className='underline'>Announcement</Link>
                                </td>
                                <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>
                                    <Link to={'/profile/2'} className='underline'>User</Link>
                                </td>
                                <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>Reason</td>
                                <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48 space-x-2'>
                                    <button className='bg-primary font-bold py-2 px-4 rounded w-24 hover:scale-105 transition-all duration-300'>
                                        {
                                            index % 2 === 0 ? 'Hide' : 'Unhide'
                                        }
                                    </button>
                                    <button className='bg-red-500 font-bold py-2 px-4 rounded hover:scale-105 transition-all duration-300'>
                                        Delete
                                    </button>
                                    <button className='bg-green-300 font-bold py-2 px-4 rounded hover:scale-105 transition-all duration-300'>
                                        Resolved
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