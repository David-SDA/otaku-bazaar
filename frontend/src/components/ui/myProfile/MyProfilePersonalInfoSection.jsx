import React from 'react';
import MyProfileEditableField from './MyProfileEditableField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function MyProfilePersonalInfoSection({user}){
    return (
        <div className='py-4 mb-6'>
            <div className='flex items-center overflow-hidden whitespace-nowrap'>
                <h2 className='truncate w-full mr-2 text-xl font-bold'>Personal Information</h2>
                <FontAwesomeIcon icon={faPenToSquare} className='text-primary cursor-pointer' />
            </div>
            <div className='mt-4'>
                <MyProfileEditableField label={'Username'} value={user.username} />
                <MyProfileEditableField label={'Email'} value={user.email} />
                <MyProfileEditableField label={'Phone Number'} value={user?.phoneNumber} />
                <MyProfileEditableField label={'Contact email'} value={user.contactEmail} />
                <MyProfileEditableField label={'City'} value={user?.city} />
            </div>
        </div>
    )
}