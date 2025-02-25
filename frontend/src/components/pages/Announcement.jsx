import React, { useEffect, useRef, useState } from 'react';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import AnnouncementSellingInfo from '../ui/announcement/AnnouncementSellingInfo';
import AnnouncementSellerInfo from '../ui/announcement/AnnouncementSellerInfo';
import AnnouncementFullDescription from '../ui/announcement/AnnouncementFullDescription';
import AnnouncementButtons from '../ui/announcement/AnnouncementButtons';
import AnnouncementPrice from '../ui/announcement/AnnouncementPrice';
import AnnouncementName from '../ui/announcement/AnnouncementName';
import AnnouncementSmallDescription from '../ui/announcement/AnnouncementSmallDescription';
import LoadingAnimation from '../ui/general/LoadingAnimation';
import { useAuth } from '../../context/AuthContext';
import AnnouncementReportModal from '../ui/announcement/AnnouncementReportModal';

export default function Announcement(){
    const { id } = useParams();
    const [announcement, setAnnouncement] = useState(null);
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // Index du tableau d'images
    const [isLoading, setLoading] = useState(true);
    const [isInWishlist, setInWishlist] = useState(false);
    const [isReportModalOpen, setReportModalOpen] = useState(false);
    const [isReported, setReported] = useState(false);
    const contactRef = useRef();
    const fullDescriptionRef = useRef(null);
    const { isAuthenticated, user } = useAuth();
    
    if(isNaN(id) || id <= 0){
        throw new Error();
    }

    useEffect(() => {
        async function fetchAnnouncementAndImages(){
            try{
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/announcements/${id}`);
                if(!response.ok){
                    throw new Error('Failed to fetch announcement');
                }
    
                const data = await response.json();
                setAnnouncement(data);
                
                const imagesResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/announcements/${id}/images`);
                if(!imagesResponse.ok){
                    throw new Error('Failed to fetch announcement images');
                }

                const imageData = await imagesResponse.json();
                setImages(imageData);

                if(isAuthenticated){
                    const wishlistResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/wishes`, {credentials: 'include'});
                    if(!wishlistResponse.ok){
                        throw new Error('Failed to fetch wishlist');
                    }
    
                    const wishlistData = await wishlistResponse.json();
                    const isInWishlist = wishlistData.some(wish => wish.id === parseInt(id));
                    setInWishlist(isInWishlist);

                    const reportedResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.sub}/reportedAnnouncements`, {credentials: 'include'});
                    if(!reportedResponse.ok){
                        throw new Error('Failed to fetch reported announcements');
                    }

                    const reportedData = await reportedResponse.json();
                    const isReported = reportedData.some(report => report.id === parseInt(id));
                    setReported(isReported);
                }
            }
            catch(error){
                console.error('Error fetching announcement:', error);
            }
            finally{
                setLoading(false);
            }
        }

        fetchAnnouncementAndImages();
    }, [id, isAuthenticated, user]);

    // Fonction pour aller à l'image suivante
    function nextImage(){
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Fonction pour aller à l'image précédente
    function prevImage(){
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    function toggleReportModal(){
        setReportModalOpen(!isReportModalOpen);
    }

    return (
        <>
            {
                isLoading ? (
                    <LoadingAnimation />
                ) : (
                    announcement.isHidden ? (
                        <div className='text-center text-2xl font-bold text-primary mt-10'>This announcement has been hidden</div>
                    ) : (
                        <>
                            <div className='lg:grid lg:grid-cols-[5fr,6fr] gap-10'>
                                <div className='relative'>
                                    {
                                        images.length > 0 ? (
                                            <>
                                                <img src={images[currentIndex].path ? images[currentIndex].path : 'https://placehold.co/400'} alt='' className='object-contain rounded-lg w-full h-96 shadow pointer-events-none bg-white' />
                                                <div className='hidden sm:grid sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-6 lg:place-items-center mt-4'>
                                                    {
                                                        images.map((image, index) => (
                                                            <img key={index} src={image.path} alt='' className={`cursor-pointer object-contain bg-white rounded-lg shadow h-20 w-20 lg:h-16 lg:w-16 xl:h-20 xl:w-20 ${ images[currentIndex] === image ? 'ring-4 ring-primary scale-105' : '' }`} onClick={() => setCurrentIndex(index)} />
                                                        ))
                                                    }
                                                </div>
                                                <button className='sm:hidden bg-primary w-8 h-8 text-white rounded-full font-bold absolute top-1/2 right-0 -translate-y-1/2' onClick={nextImage}>
                                                    <FontAwesomeIcon icon={faCaretRight} size='lg' />
                                                </button>
                                                <button className='sm:hidden bg-primary w-8 h-8 text-white rounded-full font-bold absolute top-1/2 left-0 -translate-y-1/2' onClick={prevImage}>
                                                    <FontAwesomeIcon icon={faCaretLeft} size='lg' />
                                                </button>
                                            </>
                                        ) : (
                                            <p className="text-center text-gray-500">No images available.</p>
                                        )
                                    }
                                </div>
                                <div className='mt-5 lg:mt-0'>
                                    <AnnouncementName announcementName={announcement.title} />
                                    <AnnouncementSellingInfo userId={announcement.userId} username={announcement.User.username} city={announcement.User?.city} createdAt={announcement.createdAt} />
                                    <AnnouncementPrice price={announcement.price} />
                                    <AnnouncementSmallDescription description={announcement?.description} ref={fullDescriptionRef} />
                                    <AnnouncementButtons announcement={announcement} isInWishlist={isInWishlist} onToggleWishlist={setInWishlist} isAuthenticated={isAuthenticated} ref={contactRef} />
                                </div>
                            </div>
                            <AnnouncementFullDescription description={announcement?.description} ref={fullDescriptionRef} />
                            <AnnouncementSellerInfo contactEmail={announcement.User.contactEmail} phoneNumber={announcement.User?.phoneNumber} city={announcement.User?.city} ref={contactRef} />
                            {
                                isAuthenticated && !isReported && (
                                    <button onClick={toggleReportModal} className='bg-red-500 text-white py-2 px-4 rounded-xl font-bold hover:bg-red-600 mt-4'>
                                        Report this announcement
                                    </button>
                                )
                            }
                            {
                                isReportModalOpen && (
                                    <AnnouncementReportModal announcementId={announcement.id} onClose={toggleReportModal} setReported={setReported} />
                                )
                            }
                        </>
                    )
                )
            }
        </>
    )
}