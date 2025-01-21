import React, { forwardRef } from 'react';

function AnnouncementSellerInfo({contactEmail, phoneNumber, city}, ref){
    return (
        <div className='my-5' ref={ref}>
            <h2 className='text-xl font-bold'>
                Seller Contacts
            </h2>
            <div className='mt-3'>
                <p>
                    <span className='font-bold'>Contact Email :</span> {contactEmail}
                </p>
                {
                    phoneNumber && (
                        <p>
                            <span className='font-bold'>Phone Number :</span> {phoneNumber}
                        </p>
                    )
                }
                {
                    city && (
                        <p>
                            <span className='font-bold'>City :</span> {city}
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default forwardRef(AnnouncementSellerInfo)