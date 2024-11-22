import React from 'react';
import data from '../../db.json';
import CategoryCard from '../ui/CategoryCard';

export default function Categories(){
    return (
        <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {
                data.categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        category={category.label}
                        categoryImage={category.image}
                    />
                ))
            }
        </div>
    )
}
