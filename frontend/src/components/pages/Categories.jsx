import React, { useEffect, useState } from 'react';
import CategoryCard from '../ui/category/CategoryCard';

export default function Categories(){
    const [categories, setCategories] = useState([]);
    const [error, SetError] = useState(null);
    
    async function fetchCategories(){
        try{
            const cachedCategories = localStorage.getItem('categories');
            if(cachedCategories){
                setCategories(JSON.parse(cachedCategories));
                return;
            }
            else{
                const response = await fetch('http://localhost:5050/categories');
                if(!response.ok){
                    throw new Error('Error status: ', response.status);
                }
                const data = await response.json();
                localStorage.setItem('categories', JSON.stringify(data));
                setCategories(data);
            }
        }
        catch(error){
            SetError(error.message);
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
