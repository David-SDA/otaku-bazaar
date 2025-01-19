import React from 'react';

export default function ErrorMessage({errorMessage}){
    return (
        <div className="mb-5 p-3 text-center rounded-lg bg-red-100 border border-red-400 text-red-700">
            {errorMessage}
        </div>
    )
}