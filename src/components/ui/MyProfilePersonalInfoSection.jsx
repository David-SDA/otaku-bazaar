import React from 'react';
import MyProfileEditableField from './MyProfileEditableField';

export default function MyProfilePersonalInfoSection({ onEditClick }){
    return (
        <div className="py-4 mb-6">
            <h2 className="text-xl font-bold">Personal Information</h2>
            <div className="mt-4">
                <MyProfileEditableField label={'Username'} value={'john_doe'} field={'username'} onEditClick={onEditClick} />
                <MyProfileEditableField label={'Email'} value={'johndoe@example.com'} field={'email'} onEditClick={onEditClick} />
                <MyProfileEditableField label={'Phone Number'} value={'00 00 00 00 00'} field={'phoneNumber'} onEditClick={onEditClick} />
                <MyProfileEditableField label={'City'} value={'Paris'} field={'city'} onEditClick={onEditClick} />
            </div>
        </div>
    )
}