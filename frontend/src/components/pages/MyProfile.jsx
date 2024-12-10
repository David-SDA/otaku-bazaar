import React, { useState } from 'react';
import MyProfileAvatarSection from '../ui/myProfile/MyProfileAvatarSection';
import MyProfilePersonalInfoSection from '../ui/myProfile/MyProfilePersonalInfoSection';
import MyProfilePasswordSection from '../ui/myProfile/MyProfilePasswordSection';
import MyProfileModal from '../ui/myProfile/MyProfileModal';
import MyProfileModalContent from '../ui/myProfile/MyProfileModalContent';

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
        setModalOpen(false);
    }

    return (
        <>
            <h1 className='text-center text-xl sm:text-2xl font-bold mb-6'>
                My Profile
            </h1>
            <div className='flex justify-center'>
                <div className='w-full md:w-2/3 lg:w-1/2'>
                    <MyProfileAvatarSection onEditAvatar={() => openModal('Change Avatar', 'avatar', '')} />
                    <MyProfilePersonalInfoSection onEditClick={(title, fieldKey, currentValue) => openModal(`Change ${title}`, fieldKey, currentValue)} />
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