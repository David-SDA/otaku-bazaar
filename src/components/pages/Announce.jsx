import React, { useState } from 'react';
//import { useParams } from 'react-router-dom';

export default function Announce(){
    //const { id } = useParams();
    // Faire la vérification de l'id

    const images = [
        '/assets/images/pomme.jpg',
        '/assets/images/pomme2.jpg',
        '/assets/images/pomme3.jpg',
    ];

    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className='grid grid-cols-[5fr,6fr] gap-10'>
            <div>
                <img src={mainImage} alt='' className='object-cover rounded-lg w-full h-96 shadow pointer-events-none' />
                <div className='grid grid-cols-5 gap-2 mt-4'>
                    {
                        images.map((image, index) => (
                            <img key={index} src={image} alt='Pomme' className={`cursor-pointer object-cover rounded-lg shadow h-20 ${ mainImage === image ? 'ring-4 ring-primary scale-105' : '' }`} onClick={() => setMainImage(image)} />
                        ))
                    }
                </div>
            </div>
            <div>
                colonne 2
            </div>
        </div>
    )
}