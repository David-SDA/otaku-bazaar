import React, { useCallback, useEffect, useState } from 'react';
import SearchBarAnnounce from '../ui/search/SearchBarAnnounce';
import SearchBarLocation from '../ui/search/SearchBarLocation';
import SearchFilter from '../ui/search/SearchFilter';
import SearchFiltersModal from '../ui/search/SearchFiltersModal';
import AnnouncementCard from '../ui/announcement/AnnouncementCard';
import LoadingAnimation from '../ui/general/LoadingAnimation';

export default function Search(){
    const [isModalOpen, setModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        categoryId: '',
        priceSort: '',
        sortDate: '',
        sortAlphabetical: '',
        city: '',
    });

    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchAnnouncements = useCallback(async () => {
        setLoading(true);
        try{
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(`http://localhost:8000/announcements?${queryParams}`);
            if(!response.ok){
                throw new Error('Error fetching announcements');
            }

            const data = await response.json();
            setAnnouncements(data.rows);
            setLoading(false);
        }
        catch(error){
            console.error('Error fetching announcements :', error);
        }
        finally{
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchAnnouncements();
    }, [fetchAnnouncements]);

    function handleApplyFilters(newFilters){
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters
        }));
        setModalOpen(false);
    }

    function handleSearchChange(field, value){
        setFilters(prevFilters => ({
            ...prevFilters,
            [field]: value
        }));
    }

    return (
        <>
            <h1 className='text-xl lg:text-2xl font-bold'>
                Research what you need
            </h1>
            <div className='my-5 flex flex-wrap justify-between'>
                <div className='flex-grow md:mr-5 w-full md:w-auto'>
                    <SearchBarAnnounce value={filters.search} onChange={(value) => handleSearchChange('search', value)} />
                </div>
                <div className='flex-grow flex mt-5 md:mt-0'>
                    <div className='flex-grow mr-5'>
                        <SearchBarLocation value={filters.city} onChange={(value) => handleSearchChange('city', value)} />
                    </div>
                    <div className='self-center'>
                        <SearchFilter onClick={() => setModalOpen(true)} />
                    </div>

                </div>
            </div>
            {
                isLoading && (
                    <LoadingAnimation />
                )
            }
            {
                !isLoading && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 select-none place-items-center'>
                        {
                            announcements.length > 0 ? (
                                announcements.map((announcement) => (
                                    <AnnouncementCard key={announcement.id} announcement={announcement} />
                                ))
                            ) : (
                                <p>No announcements found</p>
                            )
                        }
                    </div>
                )
            }
            {
                isModalOpen && <SearchFiltersModal filters={filters} onClose={() => setModalOpen(false)} onApply={handleApplyFilters} />
            }
        </>
    )
}