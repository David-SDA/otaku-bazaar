import React from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SearchBarAnnounce() {
    return (
        <div className='relative'>
            <input type='text' placeholder='Search for an announce' className='bg-white w-full ps-11 pe-5 py-2 border border-gray-500 rounded-lg' />
            <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute left-4 top-1/2 -translate-y-1/2' />
        </div>
    )
}