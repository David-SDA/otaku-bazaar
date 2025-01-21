import React, { useState } from 'react';

export default function AnnouncementReportModal({announcementId, onClose, setReported}){
    const [reason, setReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        setIsSubmitting(true);
        try{
            const response = await fetch(`http://localhost:8000/users/reportedAnnouncements/${announcementId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reason }),
                credentials: 'include',
            });
            
            if(!response.ok){
                throw new Error('Failed to report announcement');
            }
            
            setReported(true);
            onClose();
        }
        catch(error){
            console.error('Error reporting announcement:', error);
        }
        finally{
            setIsSubmitting(false);
        }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-6 rounded-lg w-96 shadow-lg'>
                <h2 className='text-xl font-bold mb-4'>Report this announcement</h2>
                <form onSubmit={handleSubmit}>
                    <label className='block mb-2 font-medium'>Reason :</label>
                    <select
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className='w-full p-2 border rounded-lg mb-4'
                        required
                    >
                        <option value=''>-- Select a reason --</option>
                        <option value='Inappropriate content'>Inappropriate content</option>
                        <option value='Fraudulent announcement'>Fraudulent announcement</option>
                        <option value='Rules violation'>Rules violation</option>
                        <option value='Other'>Other</option>
                    </select>
                    <div className='flex justify-end'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg mr-2'
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='bg-red-500 text-white font-bold py-2 px-4 rounded-lg'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Report'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
