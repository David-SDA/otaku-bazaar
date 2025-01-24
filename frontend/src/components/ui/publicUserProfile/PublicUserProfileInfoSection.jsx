import React from 'react';
import PublicUserProfileInfoLine from './PublicUserProfileInfoLine';

export default function PublicUserProfileInfoSection({user}){
    return (
        <div className='flex flex-col sm:flex-row mx-auto mb-6'>
            <img src={'https://placehold.co/400'} alt='' className='w-36 h-36 rounded-full mx-auto mb-5 sm:mb-0 sm:me-5' />
            <div>
                <h1 className='text-2xl text-center sm:text-start font-bold mb-3'>{user.username}</h1>
                <PublicUserProfileInfoLine title={'Contact Email'} value={user.contactEmail} />
                {
                    user?.phoneNumber && (
                        <PublicUserProfileInfoLine title={'Phone number'} value={user?.phoneNumber} />
                    )
                }
                {
                    user?.city && (
                        <PublicUserProfileInfoLine title={'City'} value={user?.city} />
                    )
                }
            </div>
        </div>
    )
}