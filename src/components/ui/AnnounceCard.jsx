import React from 'react';
import pomme from '../../assets/images/pomme.jpg'

export default function AnnounceCard(){
    return (
        // Placer le lien vers le produit
        <div className='bg-[#F7EDE2] border border-[#F5CAC3] rounded-lg p-5 flex flex-col mr-6'>
            <img src={pomme} alt='Pomme' className='object-cover rounded-lg shadow' />
            <div className='font-bold my-3'>
                <p>Nom objet vendu</p>
                <p className='mt-2'>00,00 €</p>
            </div>
            <div className='self-end text-sm mt-3'>
                <p className='italic text-end'>0 days ago</p>
                <p className='italic text-end'>Sold by xxxxxxx</p>
            </div>
        </div>
    )
}
