import React from 'react';

export default function AdminModeratorConfirmationModal({isOpen, onClose, onConfirm, title}){
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}