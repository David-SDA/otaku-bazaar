import React from 'react';

export default function MyProfileAvatarSection({onEditAvatar, avatar}){
    return (
        <div className='mb-6 text-center'>
            <img src={avatar ? avatar : 'https://placehold.co/400'} alt='Avatar' className='w-36 h-36 rounded-full mx-auto mb-4' />
            <button onClick={onEditAvatar} className='bg-primary font-bold px-6 py-2 rounded-lg mt-2 hover:scale-105 transition-all duration-300'>
                Change Avatar
            </button>
        </div>
    )
}