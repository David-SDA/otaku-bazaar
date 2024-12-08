import React from 'react';
import PublicUserInfoLine from './PublicUserInfoLine';

export default function PublicUserInfoSection(){
    return (
        <div className='flex flex-col sm:flex-row mx-auto mb-6'>
            <img src='https://via.placeholder.com/150' alt='' className='w-36 h-36 rounded-full mx-auto mb-5 sm:mb-0 sm:me-5' />
            <div>
                <h1 className='text-2xl text-center sm:text-start font-bold mb-3'>john_doe</h1>
                <PublicUserInfoLine title={'Contact Email'} value={'johndoe@example.com'} />
                <PublicUserInfoLine title={'Phone number'} value={'00 00 00 00 00'} />
                <PublicUserInfoLine title={'City'} value={'city'} />
            </div>
        </div>
    )
}