import React from 'react';
import AnnounceCard from '../ui/AnnounceCard';

export default function Wishlist(){
    // Récupérer la wishlist et trier toujours du plus recent au plus ancien (annonce, pas ajout à la wishlist)
    return (
        <>
            <h1 className='text-center text-xl lg:text-2xl font-bold mb-5'>Your Wishlist</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 select-none place-items-center'>
                {
                    Array.from({length: 12}).map((_, index) => (
                        <AnnounceCard key={index} />
                    ))
                }
            </div>
        </>
    )
}