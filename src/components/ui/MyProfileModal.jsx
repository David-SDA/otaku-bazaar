import React from 'react';

export default function MyProfileModal({ onClose, title, children }){
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        &#x2715;
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
}