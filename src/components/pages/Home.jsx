import React from 'react'
import AnnounceLine from '../ui/AnnounceLine';

export default function Home() {
    return (
        <div className='container mx-auto mb-5'>
            <h2 className='text-2xl font-bold py-5'>What's new</h2>
            <AnnounceLine />
            <h2 className='text-2xl font-bold py-5'>Popular categories</h2>
            <AnnounceLine />
            <h2 className='text-2xl font-bold py-5'>Figurines</h2>
            <AnnounceLine />
            <h2 className='text-2xl font-bold py-5'>Posters</h2>
            <AnnounceLine />
        </div>
    );
}
