import React from 'react';
import { Link } from 'react-router-dom';

export default function AnnouncementSellingInfo(){
    return (
        <div className='my-5'>
            <Link to={'/'} className='italic'>
                Sold by <Link to={'/profile/2'} className='font-bold underline'>xxxxxxx</Link>
            </Link>
            <p className='italic'>
                New York, USA
            </p>
            <p className='italic'>
                0 days ago
            </p>
        </div>
    )
}