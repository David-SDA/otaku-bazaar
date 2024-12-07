import React from 'react';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Profile(){
    return (
        <>
            <h1 className="text-center text-xl sm:text-2xl font-bold mb-6">
                My Profile
            </h1>
            <div className="flex justify-center">
                <div className="w-full md:w-2/3 lg:w-1/2">
                    <div className="mb-6 text-center">
                        <img src="https://via.placeholder.com/150" alt="Avatar" className="w-32 h-32 rounded-full mx-auto mb-4" />
                        <button className="bg-primary font-bold px-6 py-2 rounded-lg mt-2 hover:scale-105 transition-all duration-300">
                            Change Avatar
                        </button>
                    </div>
                    <div className="p-4 mb-6">
                        <h2 className="text-xl font-bold">Personal Information</h2>
                        <div className="mt-4">
                            <div className="flex flex-col sm:flex-row justify-between mb-3">
                                <span className="font-bold">Username:</span>
                                <div className="flex items-center overflow-hidden whitespace-nowrap">
                                    <span className="truncate w-full mr-2">john_doe</span>
                                    <FontAwesomeIcon icon={faPenToSquare} className="text-primary cursor-pointer" />
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between mb-3">
                                <span className="font-bold">Email:</span>
                                <div className="flex items-center overflow-hidden whitespace-nowrap">
                                    <span className="truncate w-full mr-2">johndoe@example.com</span>
                                    <FontAwesomeIcon icon={faPenToSquare} className="text-primary cursor-pointer" />
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between mb-3">
                                <span className="font-bold">Phone Number:</span>
                                <div className="flex items-center overflow-hidden whitespace-nowrap">
                                    <span className="truncate w-full mr-2">00 00 00 00 00</span>
                                    <FontAwesomeIcon icon={faPenToSquare} className="text-primary cursor-pointer" />
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between mb-3">
                                <span className="font-bold">City:</span>
                                <div className="flex items-center overflow-hidden whitespace-nowrap">
                                    <span className="truncate w-full mr-2">Paris</span>
                                    <FontAwesomeIcon icon={faPenToSquare} className="text-primary cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 rounded-lg mb-6">
                        <h2 className="text-xl font-bold">Change Password</h2>
                        <button className="bg-primary font-bold px-6 py-2 rounded-lg mt-2 hover:scale-105 transition-all duration-300">
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}