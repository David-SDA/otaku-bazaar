import React, { useState } from 'react';
import SearchBarAnnounce from '../ui/SearchBarAnnounce';
import SearchBarLocation from '../ui/SearchBarLocation';
import SearchFilter from '../ui/SearchFilter';
import AnnounceCard from '../ui/AnnounceCard';
import SearchFiltersModal from '../ui/SearchFiltersModal';

export default function Search(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        category: '',
        priceSort: '',
        sortByDate: '',
        alphabeticalOrder: '',
    });

    function handleApplyFilters(newFilters) {
        setFilters(newFilters);
        setIsModalOpen(false);
        console.log('Applied Filters:', newFilters);
    }

    return (
        <>
            <h1 className='text-xl lg:text-2xl font-bold'>
                Research what you need
            </h1>
            <div className='my-5 flex flex-wrap justify-between'>
                <div className='flex-grow md:mr-5 w-full md:w-auto'>
                    <SearchBarAnnounce />
                </div>
                <div className='flex-grow flex mt-5 md:mt-0'>
                    <div className='flex-grow mr-5'>
                        <SearchBarLocation />
                    </div>
                    <div className='self-center'>
                        <SearchFilter onClick={() => setIsModalOpen(true)} />
                    </div>

                </div>
            </div>
            <div className='flex flex-wrap gap-y-5 gap-x-5 justify-around md:justify-between select-none'>
                {
                    Array.from({length: 25}, (_, index) => (
                        <AnnounceCard key={index} />
                    ))
                }
            </div>
            {
                isModalOpen && <SearchFiltersModal filters={filters} onClose={() => setIsModalOpen(false)} onApply={handleApplyFilters} />
            }
        </>
    )
}