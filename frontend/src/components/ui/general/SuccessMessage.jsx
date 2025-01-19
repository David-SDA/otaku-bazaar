import React from 'react';

export default function SuccessMessage({successMessage}){
    return (
        <div className="mb-5 p-3 text-center rounded-lg bg-green-100 border border-green-400 text-green-700">
            {successMessage}
        </div>
    )
}