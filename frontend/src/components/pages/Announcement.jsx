import React, { useRef, useState } from 'react';
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

export default function Announcement(){
    const { id } = useParams();
    
    if(isNaN(id) || id <= 0){
        throw new Error();
    }

    const images = [
        '/assets/images/pomme.jpg',
        '/assets/images/pomme2.jpg',
        '/assets/images/pomme3.jpg',
        '/assets/images/pomme4.jpg',
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0); // Index du tableau d'images
    const contactRef = useRef();
    const fullDescriptionRef = useRef(null);
    
    // Fonction pour aller à l'image suivante
    function nextImage(){
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Fonction pour aller à l'image précédente
    function prevImage(){
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <>
            <div className='lg:grid lg:grid-cols-[5fr,6fr] gap-10'>
                <div className='relative'>
                    <img src={images[currentIndex]} alt='' className='object-contain rounded-lg w-full h-96 shadow pointer-events-none bg-white' />
                    <div className='hidden sm:grid sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-6 lg:place-items-center mt-4'>
                        {
                            images.map((image, index) => (
                                <img key={index} src={image} alt='Pomme' className={`cursor-pointer object-contain bg-white rounded-lg shadow h-20 w-20 lg:h-16 lg:w-16 xl:h-20 xl:w-20 ${ images[currentIndex] === image ? 'ring-4 ring-primary scale-105' : '' }`} onClick={() => setCurrentIndex(index)} />
                            ))
                        }
                    </div>
                    <button className='sm:hidden bg-primary w-8 h-8 text-white rounded-full font-bold absolute top-1/2 right-0 -translate-y-1/2' onClick={nextImage}>
                        <FontAwesomeIcon icon={faCaretRight} size='lg' />
                    </button>
                    <button className='sm:hidden bg-primary w-8 h-8 text-white rounded-full font-bold absolute top-1/2 left-0 -translate-y-1/2' onClick={prevImage}>
                        <FontAwesomeIcon icon={faCaretLeft} size='lg' />
                    </button>
                </div>
                <div className='mt-5 lg:mt-0'>
                    <AnnouncementName />
                    <AnnouncementSellingInfo />
                    <AnnouncementPrice />
                    <AnnouncementSmallDescription fullDescriptionRef={fullDescriptionRef} />
                    <AnnouncementButtons ref={contactRef} />
                </div>
            </div>
            <AnnouncementFullDescription ref={fullDescriptionRef} />
            <AnnouncementSellerInfo ref={contactRef} />
        </>
    )
}