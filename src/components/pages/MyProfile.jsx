import React from 'react';
import MyProfileAvatarSection from '../ui/MyProfileAvatarSection';
import MyProfilePersonalInfoSection from '../ui/MyProfilePersonalInfoSection';
import MyProfilePasswordSection from '../ui/MyProfilePasswordSection';

export default function MyProfile(){
    return (
        <>
            <h1 className="text-center text-xl sm:text-2xl font-bold mb-6">
                My Profile
            </h1>
            <div className="flex justify-center">
                <div className="w-full md:w-2/3 lg:w-1/2">
                    <MyProfileAvatarSection />
                    <MyProfilePersonalInfoSection />
                    <MyProfilePasswordSection />
                </div>
            </div>
        </>
    )
}