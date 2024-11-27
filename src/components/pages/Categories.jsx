import React from 'react';
import data from '../../db.json';
import CategoryCard from '../ui/CategoryCard';

export default function Categories(){
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
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
