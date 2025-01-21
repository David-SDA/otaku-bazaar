import React from 'react';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../../utils/dateUtils';

export default function AnnouncementSellingInfo({userId, username, city, createdAt}){
    return (
        <div className='my-5'>
            <p className='italic'>
                Sold by <Link to={`/profile/${userId}`} className='font-bold underline hover:text-primary'>{username || 'Unknown'}</Link>
            </p>
            {
                city && (
                    <p className='italic'>
                        {city}
                    </p>
                )
            }
            <p className='italic'>
                {timeAgo(createdAt)}
            </p>
        </div>
    )
}