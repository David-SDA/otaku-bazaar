import React from 'react';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SearchFilter({onClick}){
    return (
        <div onClick={onClick} className='cursor-pointer'>
            <FontAwesomeIcon icon={faFilter} size='lg' />
        </div>
    )
}