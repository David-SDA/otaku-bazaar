import React, { forwardRef } from 'react';

function AnnouncementFullDescription({description}, ref){
    return (
        <div ref={ref} className='mt-14 mb-5'>
            <h2 className='text-xl font-bold'>
                Full description
            </h2>
            <p className='mt-3'>
                {description || 'No description'}
            </p>
        </div>
    )
}

export default forwardRef(AnnouncementFullDescription);