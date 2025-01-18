import React, { useEffect, useState } from 'react';
import CategoryCard from '../ui/category/CategoryCard';

export default function Categories(){
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
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
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    if(error){
        return <p>Error: {error}</p>
    }
    else if(loading){
        return (
            <div className='flex items-center justify-center'>
                <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'></div>
            </div>
        )
    }
    else{
        return (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    categories.map((category) => (
                        <CategoryCard
                            key={category._id}
                            category={category.name}
                            categoryImage={category.image}
                        />
                    ))
                }
            </div>
        )
    }
}
