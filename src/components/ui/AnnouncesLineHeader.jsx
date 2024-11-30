import React from 'react';
import { Link } from 'react-router-dom';

export default function AnnouncesLineHeader({title, link}){
    return (
        <div className='flex justify-between py-5'>
            <h2 className='text-xl lg:text-2xl font-bold'>
                {title}
            </h2>
            <Link to={link} className='text-sm lg:text-base self-center group relative'>
                See More
                <span className="absolute -bottom-1 left-1/2 w-0 transition-all duration-300 h-0.5 bg-primary group-hover:w-1/2"></span>
                <span className="absolute -bottom-1 right-1/2 w-0 transition-all duration-300 h-0.5 bg-primary group-hover:w-1/2"></span>
            </Link>
        </div>
    )
}
