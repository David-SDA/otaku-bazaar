import React, { useEffect, useState } from 'react';
import CategoryCard from '../ui/category/CategoryCard';
import LoadingAnimation from '../ui/general/LoadingAnimation';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Categories(){
    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { isAuthenticated, user } = useAuth();
    
    async function fetchCategories(){
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`);
            if(!response.ok){
                throw new Error('Error fetching categories');
            }

            const data = await response.json();
            setCategories(data);
            setLoading(false);
        }
        catch(error){
            console.log('Error fetching categories  :', error.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    if(isLoading){
        return <LoadingAnimation />
    }
    else{
        return (
            <>
                {
                    isAuthenticated && user.role === 'admin' && (
                        <Link to={'/categories/new'} className='block w-fit bg-primary font-bold ms-auto px-6 py-2 rounded-lg mt-2 mb-7 hover:scale-105 transition-all duration-300'>Create a category</Link>
                    )
                }
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
            </>
        )
    }
}
