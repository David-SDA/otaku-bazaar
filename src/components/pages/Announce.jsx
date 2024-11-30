import React, { useRef, useState } from 'react';
//import { useParams } from 'react-router-dom';

export default function Announce(){
    //const { id } = useParams();
    // Faire la vérification de l'id

    const contactRef = useRef();

    const images = [
        '/assets/images/pomme.jpg',
        '/assets/images/pomme2.jpg',
        '/assets/images/pomme3.jpg',
        '/assets/images/pomme4.jpg',
        '/assets/images/pomme.jpg',
        '/assets/images/pomme2.jpg',
    ];

    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <>
            <div className='grid grid-cols-[5fr,6fr] gap-10'>
                <div>
                    <img src={mainImage} alt='' className='object-contain rounded-lg w-full h-96 shadow pointer-events-none bg-white' />
                    <div className='grid grid-cols-6 gap-2 mt-4'>
                        {
                            images.map((image, index) => (
                                <img key={index} src={image} alt='Pomme' className={`cursor-pointer object-contain bg-white rounded-lg shadow h-20 w-20 ${ mainImage === image ? 'ring-4 ring-primary scale-105' : '' }`} onClick={() => setMainImage(image)} />
                            ))
                        }
                    </div>
                </div>
                <div>
                    <h1 className='font-bold text-2xl'>
                        Object name
                    </h1>
                    <div className='my-5'>
                        <p className='italic'>
                            Sold by xxxxxxx
                        </p>
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
                    <p className='my-5 line-clamp-[9]'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ornare felis. Ut finibus id felis vel pellentesque. Quisque vitae tincidunt velit. Pellentesque turpis lectus, luctus eget ligula non, rhoncus porta elit. Proin pretium lectus id nisl suscipit imperdiet. Fusce tristique est tristique nisl dictum tempus. Donec vel quam pulvinar urna scelerisque pharetra.
                        Morbi turpis velit, porta efficitur nibh eget, dapibus luctus nisi. Phasellus magna sapien, porttitor non accumsan nec, pellentesque eget neque. Etiam in tellus feugiat, dictum urna vel, finibus urna. Donec id venenatis felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque mollis justo quis massa lobortis mattis. Nam sapien sem, maximus at iaculis at, luctus vitae justo. Praesent fermentum velit ut vehicula feugiat. Quisque placerat laoreet venenatis. Donec quis quam egestas, commodo dui nec, congue ex. Aenean sit amet ultricies tellus. In iaculis ante nec laoreet elementum.
                    </p>
                    <div className='w-full flex justify-around'>
                        <button className='bg-primary py-3 px-10 font-bold rounded-xl hover:scale-110 transition-all duration-300'>
                            Add to wishlist
                        </button>
                        <button onClick={() => contactRef.current.scrollIntoView({ behavior: 'smooth' })} className='bg-primary py-3 px-10 font-bold rounded-xl hover:scale-110 transition-all duration-300'>
                            Contact the Seller
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-14 mb-5'>
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
                </div>
            </div>
        </>
    )
}