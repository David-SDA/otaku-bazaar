import React from 'react';
import { Link } from 'react-router-dom';

export default function AnnounceSellingInfo(){
    return (
        <div className='my-5'>
            <Link to={'/'} className='italic'>
                Sold by <span className='font-bold hover:underline'>xxxxxxx</span>
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