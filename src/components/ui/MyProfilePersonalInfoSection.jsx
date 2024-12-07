import React from 'react';
import MyProfileEditableField from './MyProfileEditableField';

export default function MyProfilePersonalInfoSection(){
    return (
        <div className="py-4 mb-6">
            <h2 className="text-xl font-bold">Personal Information</h2>
            <div className="mt-4">
                <MyProfileEditableField label={'Username'} value={'john_doe'} field={'username'} />
                <MyProfileEditableField label={'Email'} value={'johndoe@example.com'} field={'email'} />
                <MyProfileEditableField label={'Phone Number'} value={'00 00 00 00 00'} field={'phoneNumber'} />
                <MyProfileEditableField label={'City'} value={'Paris'} field={'city'} />
            </div>
        </div>
    )
}