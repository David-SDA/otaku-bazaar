import React from 'react';

export default function LoadingAnimation(){
    return (
        <div className='flex items-center justify-center'>
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'></div>
        </div>
    )
}
