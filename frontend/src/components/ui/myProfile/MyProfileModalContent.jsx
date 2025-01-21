import React, { useState } from 'react';

export default function MyProfileModalContent({ fieldKey, currentValue, onSave }){
    const [value, setValue] = useState(currentValue);

    function handleSave(){
        onSave(fieldKey, value);
    };

    function renderContent(){
        switch (fieldKey) {
            case 'password':
                return (
                    <div className='flex flex-col gap-3'>
                        <input type='password' placeholder='Current Password' className='w-full p-3 rounded-lg shadow' />
                        <input type='password' placeholder='New Password' className='w-full p-3 rounded-lg shadow' />
                        <input type='password' placeholder='Confirm Password' className='w-full p-3 rounded-lg shadow' />
                    </div>
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
