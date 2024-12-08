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
                    <input type='text' value={value} onChange={(e) => setValue(e.target.value)} className='w-full border rounded-lg p-3' placeholder='Enter new username' />
                )
            case 'email':
                return (
                    <input type='text' value={value} onChange={(e) => setValue(e.target.value)} className='w-full border rounded-lg p-3' placeholder='Enter new email' />
                )
            case 'phoneNumber':
                return (
                    <input type='text' value={value} onChange={(e) => setValue(e.target.value)} className='w-full border rounded-lg p-3' placeholder='Enter new phone number' />
                )
            case 'city':
                return (
                    <input type='text' value={value} onChange={(e) => setValue(e.target.value)} className='w-full border rounded-lg p-3' placeholder='Enter new city' />
                )
            case 'password':
                return (
                    <>
                        <input type='password' placeholder='Current Password' className='w-full border rounded-lg p-3 mb-3' />
                        <input type='password' placeholder='New Password' className='w-full border rounded-lg p-3 mb-3' />
                        <input type='password' placeholder='Confirm Password' className='w-full border rounded-lg p-3' />
                    </>
                )
            case 'avatar':
                return (
                    <input type='file' onChange={(e) => console.log(e.target.files[0])} className='w-full' />
                )
            default:
                return <p>Invalid field</p>;
        }
    };

    return (
        <div>
            {renderContent()}
            <button onClick={handleSave} className='mt-4 bg-primary text-white px-4 py-2 rounded-lg'>Save</button>
        </div>
    );
}
