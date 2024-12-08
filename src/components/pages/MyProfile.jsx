import React, { useState } from 'react';
import MyProfileAvatarSection from '../ui/MyProfileAvatarSection';
import MyProfilePersonalInfoSection from '../ui/MyProfilePersonalInfoSection';
import MyProfilePasswordSection from '../ui/MyProfilePasswordSection';
import MyProfileModal from '../ui/MyProfileModal';
import MyProfileModalContent from '../ui/MyProfileModalContent';

export default function MyProfile(){
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', fieldKey: '', currentValue: '' });

    function openModal(title, fieldKey, currentValue){
        setModalContent({title, fieldKey, currentValue});
        setModalOpen(true);
    }

    function closeModal(){
        setModalOpen(false);
    }

    function handleSave(fieldKey, newValue){
        console.log('Updated ', fieldKey, ' : ', newValue);
    }

    return (
        <>
            <h1 className="text-center text-xl sm:text-2xl font-bold mb-6">
                My Profile
            </h1>
            <div className="flex justify-center">
                <div className="w-full md:w-2/3 lg:w-1/2">
                    <MyProfileAvatarSection onEditAvatar={() => openModal('Change Avatar', 'avatar', '')} />
                    <MyProfilePersonalInfoSection onEditClick={(title, fieldKey, currentValue) => openModal(title, fieldKey, currentValue)} />
                    <MyProfilePasswordSection onChangePassword={() => openModal('Change Password', 'password', '')} />
                </div>
            </div>
            {
                isModalOpen && (
                    <MyProfileModal onClose={closeModal} title={modalContent.title}>
                        <MyProfileModalContent fieldKey={modalContent.fieldKey} currentValue={modalContent.currentValue} onSave={handleSave} />
                    </MyProfileModal>
                )
            }
        </>
    )
}