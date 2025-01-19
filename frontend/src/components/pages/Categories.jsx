import React, { useEffect, useState } from 'react';
import CategoryCard from '../ui/category/CategoryCard';
import LoadingAnimation from '../ui/general/LoadingAnimation';

export default function Categories(){
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    
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
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    if(error){
        return <p>Error: {error}</p>
    }
    else if(isLoading){
        return <LoadingAnimation />
    }
    else{
        return (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category.name}
                            categoryImage={category.image}
                        />
                    ))
                }
            </div>
        )
    }
}
