import React from 'react';

export default function MyProfileEditableField({label, value}){
    return (
        <div className='flex flex-col sm:flex-row justify-between mb-3'>
            <span className='font-bold'>{label}:</span>
            <div className='flex items-center overflow-hidden whitespace-nowrap'>
                <span className='truncate w-full mr-2'>{value ? value : 'Not specified'}</span>
            </div>
        </div>
    )
}