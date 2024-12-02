import React, { useState } from 'react';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SearchSort(){
    const [sortState, setSortState] = useState('none');

    function handleSortClick(){
        if(sortState === 'none'){
            setSortState('asc');
        }
        else if(sortState === 'asc'){
            setSortState('desc');
        }
        else{
            setSortState('none');
        }
    };

    function getSortIcon(){
        if(sortState === 'asc'){
            return faSortUp;
        }
        else if(sortState === 'desc'){
            return faSortDown;
        }
        else{
            return faSort;
        }
    };

    return (
        <div onClick={handleSortClick} className='cursor-pointer'>
            <FontAwesomeIcon icon={getSortIcon()} size='xl' />
        </div>
    )
}