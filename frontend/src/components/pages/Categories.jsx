import React, { useEffect, useState } from 'react';
import CategoryCard from '../ui/category/CategoryCard';

export default function Categories(){
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    
    async function fetchCategories(){
        try{
            const response = await fetch('http://localhost:5050/categories');

            if(!response.ok){
                throw new Error('Error fetching categories');
            }

            const data = await response.json();
            setCategories(data);
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
