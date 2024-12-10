import React, { useState } from 'react';

export default function MyProfileModalContent({ fieldKey, currentValue, onSave }){
    const [value, setValue] = useState(currentValue);

    function handleSave(){
        onSave(fieldKey, value);
    };

    function renderContent(){
        switch (fieldKey) {
            case 'username':
                return (
                    <input type='text' value={value} onChange={(e) => setValue(e.target.value)} className='w-full p-3 rounded-lg shadow' placeholder='Enter new username' />
                )
            case 'email':
                return (
                    <input type='email' value={value} onChange={(e) => setValue(e.target.value)} className='w-full p-3 rounded-lg shadow' placeholder='Enter new email' />
                )
            case 'contactEmail':
                return (
                    <input type='email' value={value} onChange={(e) => setValue(e.target.value)} className='w-full p-3 rounded-lg shadow' placeholder='Enter new email' />
                )
            case 'phoneNumber':
                return (
                    <input type='text' value={value} onChange={(e) => setValue(e.target.value)} className='w-full p-3 rounded-lg shadow' placeholder='Enter new phone number' />
                )
            case 'city':
                return (
                    <input type='text' value={value} onChange={(e) => setValue(e.target.value)} className='w-full p-3 rounded-lg shadow' placeholder='Enter new city' />
                )
            case 'password':
                return (
                    <>
                        <input type='password' placeholder='Current Password' className='w-full p-3 rounded-lg shadow' />
                        <input type='password' placeholder='New Password' className='w-full p-3 rounded-lg shadow' />
                        <input type='password' placeholder='Confirm Password' className='w-full p-3 rounded-lg shadow' />
                    </>
                )
            case 'avatar':
                return (
                    <input type='file' onChange={(e) => console.log(e.target.files[0])} className='w-full border bg-white rounded-lg shadow cursor-pointer file:border-none file:me-5 file:py-3 file:px-5 file:cursor-pointer file:bg-primary' />
                )
            default:
                return <p>Invalid field</p>;
        }
    };

    return (
        <div>
            {renderContent()}
            <button onClick={handleSave} className='mt-4 bg-primary font-bold px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300'>Save</button>
        </div>
    );
}
