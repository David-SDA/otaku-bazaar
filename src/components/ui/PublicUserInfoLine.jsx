import React from 'react';

export default function PublicUserInfoLine({title, value}){
    return (
        <p className='flex flex-col sm:flex-row'>
            <span className='font-bold sm:me-2'>{title} :</span>
            <span>{value}</span>
        </p>
    )
}