import React, { useEffect, useRef, useState } from 'react';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Announce(){
    const { id } = useParams();
    
    if(isNaN(id) || id <= 0){
        throw new Error();
    }

    const contactRef = useRef();

    const images = [
        '/assets/images/pomme.jpg',
        '/assets/images/pomme2.jpg',
        '/assets/images/pomme3.jpg',
        '/assets/images/pomme4.jpg',        
    ];

    const [currentIndex, setCurrentIndex] = useState(0); // Index du tableau d'images
    const [isTruncated, setIsTruncated] = useState(false); // Vérification pour savoir si le texte est tronqué
    const descriptionRef = useRef(null);
    const fullDescriptionRef = useRef(null);
    
    // Fonction pour aller à l'image suivante
    function nextImage(){
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Fonction pour aller à l'image précédente
    function prevImage(){
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        if(descriptionRef.current){
            const element = descriptionRef.current;
            setIsTruncated(element.scrollHeight > element.clientHeight);
        }
    }, []);

    return (
        <>
            <div className='lg:grid lg:grid-cols-[5fr,6fr] gap-10'>
                <div className='relative'>
                    <img src={images[currentIndex]} alt='' className='object-contain rounded-lg w-full h-96 shadow pointer-events-none bg-white' />
                    <div className='hidden sm:flex justify-between mt-4'>
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
                    <h1 className='font-bold text-2xl'>
                        Object name
                    </h1>
                    <div className='my-5'>
                        <Link to={'/'} className='italic'>
                            Sold by <span className='font-bold hover:underline'>xxxxxxx</span>
                        </Link>
                        <p className='italic'>
                            New York, USA
                        </p>
                        <p className='italic'>
                            0 days ago
                        </p>
                    </div>
                    <div className='my-5'>
                        <p className='font-bold text-2xl'>
                            00,00 €
                        </p>
                    </div>
                    <div className='hidden lg:block'>
                        <p ref={descriptionRef} className={`my-5 ${isTruncated ? 'mb-1' : ''} line-clamp-[9]`}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ornare felis. Ut finibus id felis vel pellentesque. Quisque vitae tincidunt velit. Pellentesque turpis lectus, luctus eget ligula non, rhoncus porta elit. Proin pretium lectus id nisl suscipit imperdiet. Fusce tristique est tristique nisl dictum tempus. Donec vel quam pulvinar urna scelerisque pharetra.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ornare felis. Ut finibus id felis vel pellentesque. Quisque vitae tincidunt velit. Pellentesque turpis lectus, luctus eget ligula non, rhoncus porta elit. Proin pretium lectus id nisl suscipit imperdiet. Fusce tristique est tristique nisl dictum tempus. Donec vel quam pulvinar urna scelerisque pharetra.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ornare felis. Ut finibus id felis vel pellentesque. Quisque vitae tincidunt velit. Pellentesque turpis lectus, luctus eget ligula non, rhoncus porta elit. Proin pretium lectus id nisl suscipit imperdiet. Fusce tristique est tristique nisl dictum tempus. Donec vel quam pulvinar urna scelerisque pharetra.
                            
                        </p>
                        {isTruncated && (
                            <button
                                onClick={() => fullDescriptionRef.current.scrollIntoView({ behavior: 'smooth' })} 
                                className="text-primary font-bold mb-5 hover:underline"
                            >
                                See more
                            </button>
                        )}
                    </div>
                    <div className='w-full flex flex-col sm:flex-row justify-around'>
                        <button className='bg-primary py-3 px-10 mb-5 sm:mb-0 font-bold rounded-xl hover:scale-105 transition-all duration-300'>
                            Add to wishlist
                        </button>
                        <button onClick={() => contactRef.current.scrollIntoView({ behavior: 'smooth' })} className='bg-primary py-3 px-10 font-bold rounded-xl hover:scale-110 transition-all duration-300'>
                            Contact the Seller
                        </button>
                    </div>
                </div>
            </div>
            <div ref={fullDescriptionRef} className='mt-14 mb-5'>
                <h2 className='text-xl font-bold'>
                    Full description
                </h2>
                <p className='mt-3'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ornare felis. Ut finibus id felis vel pellentesque. Quisque vitae tincidunt velit. Pellentesque turpis lectus, luctus eget ligula non, rhoncus porta elit. Proin pretium lectus id nisl suscipit imperdiet. Fusce tristique est tristique nisl dictum tempus. Donec vel quam pulvinar urna scelerisque pharetra.
                    Morbi turpis velit, porta efficitur nibh eget, dapibus luctus nisi. Phasellus magna sapien, porttitor non accumsan nec, pellentesque eget neque. Etiam in tellus feugiat, dictum urna vel, finibus urna. Donec id venenatis felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque mollis justo quis massa lobortis mattis. Nam sapien sem, maximus at iaculis at, luctus vitae justo. Praesent fermentum velit ut vehicula feugiat. Quisque placerat laoreet venenatis. Donec quis quam egestas, commodo dui nec, congue ex. Aenean sit amet ultricies tellus. In iaculis ante nec laoreet elementum.
                </p>
            </div>
            <div className='my-5' ref={contactRef}>
                <h2 className='text-xl font-bold'>
                    Seller Contacts
                </h2>
                <div className='mt-3'>
                    <p>
                        <span className='font-bold'>Email :</span> email@email.com
                    </p>
                    <p>
                        <span className='font-bold'>Phone Number :</span> 00 00 00 00 00
                    </p>
                    <p>
                        <span className='font-bold'>City :</span> city
                    </p>
                </div>
            </div>
        </>
    )
}