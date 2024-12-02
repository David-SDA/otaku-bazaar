import React from 'react';
import SearchBarAnnounce from '../ui/SearchBarAnnounce';
import SearchBarLocation from '../ui/SearchBarLocation';
import SearchFilter from '../ui/SearchFilter';
import SearchSort from '../ui/SearchSort';
import AnnounceCard from '../ui/AnnounceCard';

export default function Search(){
    return (
        <>
            <h1 className='text-xl lg:text-2xl font-bold'>
                Research what you need
            </h1>
            <div className='my-5 flex justify-between'>
                <div className='flex-grow mr-5'>
                    <SearchBarAnnounce />
                </div>
                <div className='flex-grow mr-5'>
                    <SearchBarLocation />
                </div>
                <div className='self-center mr-5'>
                    <SearchFilter />
                </div>
                <div className='self-center'>
                    <SearchSort />
                </div>
            </div>
            <div className='flex flex-wrap gap-y-5 gap-x-5 justify-around sm:justify-between select-none'>
                {
                    Array.from({length: 25}, (_, index) => (
                        <AnnounceCard key={index} />
                    ))
                }
            </div>
        </>
    )
}