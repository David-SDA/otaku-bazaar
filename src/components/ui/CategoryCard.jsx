import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryCard({category, categoryImage}){
    return (
        <Link className='rounded-lg h-32 relative shadow overflow-hidden group hover:scale-105 hover:border hover:border-[#F5CAC3] transition-all duration-300 ease-out select-none'>
            <img src={categoryImage} alt="" className='w-full h-full object-cover'/>
            <div className='w-full h-full absolute top-0 left-0 bg-black opacity-15 group-hover:bg-[#F7EDE2] group-hover:opacity-100 transition-all duration-300 ease-out'></div>
            <p className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 font-bold sm:text-lg group-hover:text-primary transition-all duration-300 ease-out'>
                {category}
            </p>
        </Link>
    )
}