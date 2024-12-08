import React, { useState } from 'react';
import SearchBarAnnounce from '../ui/SearchBarAnnounce';
import SearchBarLocation from '../ui/SearchBarLocation';
import SearchFilter from '../ui/SearchFilter';
import AnnounceCard from '../ui/AnnounceCard';
import SearchFiltersModal from '../ui/SearchFiltersModal';

export default function Search(){
    const [isModalOpen, setModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        category: '',
        priceSort: '',
        sortByDate: '',
        alphabeticalOrder: '',
    });

    function handleApplyFilters(newFilters){
        setFilters(newFilters);
        setModalOpen(false);
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
                        <SearchFilter onClick={() => setModalOpen(true)} />
                    </div>

                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 select-none place-items-center'>
                {
                    Array.from({length: 23}, (_, index) => (
                        <AnnounceCard key={index} />
                    ))
                }
            </div>
            {
                isModalOpen && <SearchFiltersModal filters={filters} onClose={() => setModalOpen(false)} onApply={handleApplyFilters} />
            }
        </>
    )
}