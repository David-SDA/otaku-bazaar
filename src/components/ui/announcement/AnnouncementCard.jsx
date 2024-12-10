import React from 'react';
import { Link } from 'react-router-dom';

export default function AnnouncementCard(){
    return (
        <div className='bg-[#F7EDE2] border border-[#F5CAC3] rounded-lg flex flex-col shrink-0 w-56 group'>
            <Link to={'/announces/2'} className='p-5 rounded-lg' draggable='false'>
                <img src='/assets/images/pomme.jpg' alt='Pomme' className='object-cover rounded-lg shadow pointer-events-none group-hover:scale-105 transition-all duration-300' />
                <div className='font-bold my-4'>
                    <p className='truncate group-hover:text-primary transition-colors duration-300'>
                        Nom objet vendu nom objet vendu nom objet vendu
                    </p>
                    <p className='mt-2'>
                        00,00 €
                    </p>
                </div>
                <div className='self-end text-[13px] mt-3'>
                    <p className='italic text-end'>
                        Sold by xxxxxxx
                    </p>
                    <p className='italic text-end'>
                        New York, USA
                    </p>
                    <p className='italic text-end'>
                        0 days ago
                    </p>
                </div>
            </Link>
        </div>
    )
}
