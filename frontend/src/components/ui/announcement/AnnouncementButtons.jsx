import React, { forwardRef } from 'react';

function AnnouncementButtons(_props, ref){
    return (
        <div className='w-full flex flex-col sm:flex-row justify-around'>
            <button className='bg-primary py-3 px-10 mb-5 sm:mb-0 font-bold rounded-xl hover:scale-105 transition-all duration-300'>
                Add to wishlist
            </button>
            <button onClick={() => ref.current.scrollIntoView({ behavior: 'smooth' })} className='bg-primary py-3 px-10 font-bold rounded-xl hover:scale-110 transition-all duration-300'>
                Contact the Seller
            </button>
        </div>
    )
}

export default forwardRef(AnnouncementButtons);