import React from 'react';

export default function CategoryCard({category, categoryImage}){
    return (
        <div className='rounded-lg min-h-32 relative border border-red-500'>
            <img src={categoryImage} alt="" className='absolute top-0 left-0 object-cover'/>
            <p>{category}</p>
        </div>
    )
}