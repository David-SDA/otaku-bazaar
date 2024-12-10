import React from 'react';
import PublicUserProfileInfoLine from './PublicUserProfileInfoLine';

export default function PublicUserProfileInfoSection(){
    return (
        <div className='flex flex-col sm:flex-row mx-auto mb-6'>
            <img src='https://via.placeholder.com/150' alt='' className='w-36 h-36 rounded-full mx-auto mb-5 sm:mb-0 sm:me-5' />
            <div>
                <h1 className='text-2xl text-center sm:text-start font-bold mb-3'>john_doe</h1>
                <PublicUserProfileInfoLine title={'Contact Email'} value={'johndoe@example.com'} />
                <PublicUserProfileInfoLine title={'Phone number'} value={'00 00 00 00 00'} />
                <PublicUserProfileInfoLine title={'City'} value={'city'} />
            </div>
        </div>
    )
}