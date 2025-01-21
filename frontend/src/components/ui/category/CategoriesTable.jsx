import React from 'react';
import { timeAgo } from '../../../utils/dateUtils';
import { Link } from 'react-router-dom';

export default function CategoriesTable({categories}){
    return (
        <div className='overflow-x-auto mb-5'>
            <table className='w-full table-auto border-collapse border'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='border border-gray-300 p-2 min-w-48'>Category</th>
                        <th className='border border-gray-300 p-2 min-w-48'>Created at</th>
                        <th className='border border-gray-300 p-2 min-w-48'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((category, index) => (
                            <tr key={category.id} className='even:bg-gray-100'>
                                <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>
                                    <p>{category.name}</p>
                                </td>
                                <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>
                                    <p>{timeAgo(category.createdAt)}</p>
                                </td>
                                <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48 space-x-2'>
                                    <Link to={`/categories/${category.id}`} className='inline-block w-fit bg-primary font-bold py-2 px-4 rounded hover:scale-105 transition-all duration-300'>
                                        Edit
                                    </Link>
                                    <button className='bg-red-500 font-bold py-2 px-4 rounded w-24 hover:scale-105 transition-all duration-300'>
                                        Delete
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