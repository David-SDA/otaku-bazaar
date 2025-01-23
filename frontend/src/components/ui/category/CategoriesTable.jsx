import React, { useState } from 'react';
import { timeAgo } from '../../../utils/dateUtils';
import { Link } from 'react-router-dom';
import LoadingAnimation from '../general/LoadingAnimation';
import AdminModeratorConfirmationModal from '../panels/AdminModeratorConfirmationModal';

export default function CategoriesTable({categories}){
    const [allCategories, setAllCategories] = useState(categories);
    const [isLoading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState();

    async function handleCategoryDelete(categoryId){
        setLoading(true);
        try{
            const response = await fetch(`http://localhost:8000/categories/${categoryId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if(!response.ok){
                throw new Error('Failed to delete category');
            }
            const updatedCategories = categories.filter((category) => category.id !== categoryId);
            setAllCategories(updatedCategories);
        }
        catch(error){
            console.log('Error deleting category:', error.message);
        }
        finally{
            setLoading(false);
        }
    }

    function openModal({action, categoryId}){
        setModalAction({action, categoryId});
        setModalOpen(true);
    }

    function handleModalClose(){
        const { action, categoryId } = modalAction;
        setModalOpen(false);

        if(action === 'delete'){
            handleCategoryDelete(categoryId);
        }
    }

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
                        allCategories.map((category, index) => (
                            <tr key={`${category.id}-${index}`} className='even:bg-gray-100'>
                                <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>
                                    <p>{category.name}</p>
                                </td>
                                <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48'>
                                    <p>{timeAgo(category.createdAt)}</p>
                                </td>
                                <td className='border border-gray-300 p-2 whitespace-nowrap min-w-48 space-x-2'>
                                    {
                                        isLoading ? (
                                            <LoadingAnimation />
                                        ) : (
                                            <>
                                                <Link to={`/categories/${category.id}/edit`} className='inline-block w-fit bg-primary font-bold py-2 px-4 rounded hover:scale-105 transition-all duration-300'>
                                                    Edit
                                                </Link>
                                                <button onClick={() => openModal({ action: 'delete', categoryId: category.id})} className='bg-red-500 font-bold py-2 px-4 rounded w-24 hover:scale-105 transition-all duration-300'>
                                                    Delete
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
            <AdminModeratorConfirmationModal isOpen={modalOpen} onClose={handleModalClose} onConfirm={handleModalClose} title={'Are you sure?'} />
        </div>
    )
}