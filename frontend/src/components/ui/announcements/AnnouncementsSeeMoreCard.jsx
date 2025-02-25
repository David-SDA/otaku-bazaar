import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function AnnouncementsSeeMoreCard({link}){
    return (
        <Link to={link} className='relative min-w-[238px] min-h-[370px] bg-primary content-center px-20 rounded-lg border border-primary group hover:border-[#F5CAC3] overflow-hidden'>
            <div className='absolute inset-0 bg-[#F7EDE2] rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 ease-out'></div>
            <div className='relative z-10 flex flex-col items-center'>
                <FontAwesomeIcon icon={faPlus} className='bg-white p-2 rounded-full w-10 h-10 group-hover:bg-primary group-hover:text-white' />
                <p className='text-center uppercase font-bold mt-5 group-hover:text-primary'>See More</p>
            </div>
        </Link>
    )
}