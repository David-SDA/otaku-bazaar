import React from 'react';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../../utils/dateUtils';

export default function AnnouncementCard({announcement, user}){
    const timeAgoText = timeAgo(announcement.createdAt);

    // Tri des images par id
    const sortedImages = announcement.Images ? [...announcement.Images].sort((a, b) => a.id - b.id) : [];

    return (
        <div className='bg-[#F7EDE2] border border-[#F5CAC3] rounded-lg flex flex-col shrink-0 w-56 group'>
            <Link to={`/announcements/${announcement.id}`} className='p-5 rounded-lg' draggable='false'>
                <img src={sortedImages.length > 0 ? sortedImages[0]?.path : 'https://placehold.co/400'} alt='Pomme' className='object-cover rounded-lg shadow w-[182px] h-[182px] pointer-events-none group-hover:scale-105 transition-all duration-300' />
                <div className='font-bold my-4'>
                    <p className='truncate group-hover:text-primary transition-colors duration-300'>
                        {announcement.title}
                    </p>
                    <p className='mt-2'>
                        {announcement.price} €
                    </p>
                </div>
                <div className='self-end text-[13px] mt-3'>
                    <p className='italic text-end'>
                        Sold by <span className='font-bold underline'>{user.username || 'Unknown'}</span>
                    </p>
                    {
                        user?.city && (
                            <p className='italic text-end'>
                                {user?.city}
                            </p>
                        )
                    }
                    <p className='italic text-end'>
                        {timeAgoText}
                    </p>
                </div>
            </Link>
        </div>
    )
}
