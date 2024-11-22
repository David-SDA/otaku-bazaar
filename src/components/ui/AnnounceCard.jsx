import React from 'react';
import pomme from '../../assets/images/pomme.jpg'

export default function AnnounceCard(){
    return (
        <div className='bg-[#F7EDE2] border border-[#F5CAC3] rounded-lg flex flex-col mr-6 shrink-0 w-56 group'>
            <a href='/' className='p-5 rounded-lg' draggable='false'>
                <img src={pomme} alt='Pomme' className='object-cover rounded-lg shadow pointer-events-none group-hover:scale-105 transition-all duration-300' />
                <div className='font-bold my-4'>
                    <p className='truncate group-hover:text-[#F6BD60] transition-colors duration-300'>
                        Nom objet vendu nom objet vendu nom objet vendu
                    </p>
                    <p className='mt-2'>
                        00,00 €
                    </p>
                </div>
                <div className='self-end text-[13px] mt-3'>
                    <p className='italic text-end'>
                        New York, USA
                    </p>
                    <p className='italic text-end'>
                        0 days ago
                    </p>
                    <p className='italic text-end'>
                        Sold by xxxxxxx
                    </p>
                </div>
            </a>
        </div>
    )
}
