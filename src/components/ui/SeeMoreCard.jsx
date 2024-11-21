import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function SeeMoreCard({link}){
    return (
        <a href={link} className='relative bg-[#F6BD60] content-center px-20 rounded-lg border border-[#F6BD60] group overflow-hidden'>
            <div className="absolute inset-0 bg-[#F7EDE2] rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 ease-out"></div>
            <div className='relative z-10 flex flex-col items-center'>
                <FontAwesomeIcon icon={faPlus} className='bg-white p-2 rounded-full w-10 h-10 group-hover:bg-[#F6DB60] group-hover:text-white' />
                <p className='text-center uppercase font-bold mt-5 group-hover:text-[#F6BD60]'>See More</p>
            </div>
        </a>
    )
}