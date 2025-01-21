import React, { useEffect, useState } from 'react';
import MyProfileAvatarSection from '../ui/myProfile/MyProfileAvatarSection';
import MyProfilePersonalInfoSection from '../ui/myProfile/MyProfilePersonalInfoSection';
import MyProfilePasswordSection from '../ui/myProfile/MyProfilePasswordSection';
import MyProfileModal from '../ui/myProfile/MyProfileModal';
import MyProfileModalContent from '../ui/myProfile/MyProfileModalContent';
import LoadingAnimation from '../ui/general/LoadingAnimation';
import { Link } from 'react-router-dom';

export default function MyProfile(){
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', fieldKey: '', currentValue: '' });
    const [myProfileData, setMyProfileData] = useState();
    const [isLoading, setLoading] = useState(true);


    async function fetchMyProfile(){
        try{
            const response = await fetch('http://localhost:8000/auth/profile', { credentials: 'include' });
            if(!response.ok){
                throw new Error('Failed to fetch my profile');
            }

            const profileData = await response.json();
            setMyProfileData(profileData);
        }
        catch(error){
            console.error('Error fetching my profile:', error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMyProfile();
    }, []);

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
        isLoading ? (
            <LoadingAnimation />
        ) : (
            <>
                <h1 className='text-center text-xl sm:text-2xl font-bold mb-6'>
                    My Profile
                </h1>
                <Link to={`/profile/${myProfileData.id}`} className='block w-fit bg-primary font-bold ms-auto px-6 py-2 rounded-lg mb-2 hover:scale-105 transition-all duration-300'>Go to my public page</Link>
                <div className='flex justify-center'>
                    <div className='w-full md:w-2/3 lg:w-1/2'>
                        <MyProfileAvatarSection onEditAvatar={() => openModal('Change Avatar', 'avatar', '')} avatar={myProfileData?.avatar} />
                        <MyProfilePersonalInfoSection onEditClick={(title, fieldKey, currentValue) => openModal(`Change ${title}`, fieldKey, currentValue)} user={myProfileData} />
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
    )
}