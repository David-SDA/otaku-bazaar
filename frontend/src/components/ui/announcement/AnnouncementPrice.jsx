import React from 'react';

export default function AnnouncementPrice({price}){
    return (
        <div className='my-5'>
            <p className='font-bold text-2xl'>
                {price} €
            </p>
        </div>
    )
}