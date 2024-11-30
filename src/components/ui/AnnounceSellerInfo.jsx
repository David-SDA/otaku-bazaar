import React, { forwardRef } from 'react';

function AnnounceSellerInfo(_props, ref){
    return (
        <div className='my-5' ref={ref}>
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
    )
}

export default forwardRef(AnnounceSellerInfo)