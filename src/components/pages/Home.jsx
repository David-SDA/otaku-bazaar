import React from 'react'
import AnnounceCard from '../ui/AnnounceCard';

export default function Home() {
    return (
        <div className='container mx-auto pt-5'>
            <h1 className='text-center text-3xl font-bold'>Home</h1>
            <h2>What's new</h2>
            <div className='flex'>
                <AnnounceCard />
                <AnnounceCard />
                <AnnounceCard />
                <AnnounceCard />
                <AnnounceCard />
            </div>
            <h2>Popular categories</h2>
            <h2>Figurines</h2>
            <h2>Posters</h2>
        </div>
    );
}
