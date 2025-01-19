import React, { useEffect, useState } from 'react';
import LoadingAnimation from '../general/LoadingAnimation';

export default function SearchFiltersModal({filters, onApply}){
    const [category, setCategory] = useState(filters.category);
    const [sortByDate, setSortByDate] = useState(filters.sortByDate);
    const [alphabeticalOrder, setAlphabeticalOrder] = useState(filters.alphabeticalOrder);
    const [priceSort, setPriceSort] = useState(filters.priceSort);

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    function applyFilters() {
        onApply({
            category,
            sortByDate,
            alphabeticalOrder,
            priceSort,
        })
    }

    function resetFilters() {
        setCategory('');
        setSortByDate('');
        setAlphabeticalOrder('');
        setPriceSort('');
    }

    async function fetchCategories(){
        try{
            const response = await fetch('http://localhost:8000/categories');
            if(!response.ok){
                throw new Error('Error fetching categories');
            }

            const data = await response.json();
            setCategories(data);
            setLoading(false);
        }
        catch(error){
            console.error('Error fetching categories:', error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
            {
                loading ? (
                    <LoadingAnimation />
                ) : (
                    <div className='bg-[#f4f6ee] p-5 rounded-lg shadow-lg w-11/12 sm:w-2/3'>
                        <h2 className='text-lg font-bold mb-3'>Filter</h2>
                        <div className='mb-4'>
                            <label className='block font-bold mb-2'>Filter by Category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full p-3 rounded-lg shadow'>
                                <option value=''>All Categories</option>
                                {
                                    categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label className='block font-bold mb-2'>Sort by Price</label>
                            <div className='flex flex-col sm:flex-row sm:space-x-4'>
                                <label>
                                    <input type='radio' name='priceOrder' value='asc' checked={priceSort === 'asc'} onChange={(e) => setPriceSort(e.target.value)} className='mr-2' />
                                    Low to High
                                </label>
                                <label>
                                    <input type='radio' name='priceOrder' value='desc' checked={priceSort === 'desc'} onChange={(e) => setPriceSort(e.target.value)} className='mr-2' />
                                    High to Low
                                </label>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <label className='block font-bold mb-2'>Filter by Date</label>
                            <div className='flex flex-col sm:flex-row sm:space-x-4'>
                                <label>
                                    <input type='radio' name='sortByDate' value='recent' checked={sortByDate === 'recent'} onChange={(e) => setSortByDate(e.target.value)} className='mr-2' />
                                    Most Recent
                                </label>
                                <label>
                                    <input type='radio' name='sortByDate' value='oldest' checked={sortByDate === 'oldest'} onChange={(e) => setSortByDate(e.target.value)} className='mr-2' />
                                    Oldest
                                </label>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <label className='block font-bold mb-2'>Sort Alphabetically</label>
                            <div className='flex flex-col sm:flex-row sm:space-x-4'>
                                <label>
                                    <input type='radio' name='alphabeticalOrder' value='asc' checked={alphabeticalOrder === 'asc'} onChange={(e) => setAlphabeticalOrder(e.target.value)} className='mr-2' />
                                    A-Z
                                </label>
                                <label>
                                    <input type='radio' name='alphabeticalOrder' value='desc' checked={alphabeticalOrder === 'desc'} onChange={(e) => setAlphabeticalOrder(e.target.value)} className='mr-2' />
                                    Z-A
                                </label>
                            </div>
                        </div>
                        <div className='flex justify-end space-x-4 mt-4'>
                            <button onClick={resetFilters} className='border border-primary px-4 py-2 rounded-lg'>
                                Reset
                            </button>
                            <button onClick={applyFilters} className='bg-primary font-bold px-4 py-2 rounded-lg'>
                                Apply
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}