import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function MyProfileEditableField({label, value, field, onEditClick}){
    return (
        <div className='flex flex-col sm:flex-row justify-between mb-3'>
            <span className='font-bold'>{label}:</span>
            <div className='flex items-center overflow-hidden whitespace-nowrap'>
                <span className='truncate w-full mr-2'>{value}</span>
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => onEditClick(label, field, value)} className='text-primary cursor-pointer' />
            </div>
        </div>
    )
}