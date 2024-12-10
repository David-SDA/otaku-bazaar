import React from 'react';

export default function MyProfilePasswordSection({ onChangePassword }){
    return (
        <div className='py-4 rounded-lg mb-6'>
            <h2 className='text-xl font-bold'>Change Password</h2>
            <button onClick={onChangePassword} className='bg-primary font-bold px-6 py-2 rounded-lg mt-2 hover:scale-105 transition-all duration-300'>
                Change Password
            </button>
        </div>
    )
}