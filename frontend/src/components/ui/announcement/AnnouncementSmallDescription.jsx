import React, { forwardRef, useEffect, useRef, useState } from 'react';

function AnnouncementSmallDescription({description}, ref){
    const descriptionRef = useRef();
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        if(descriptionRef.current){
            const element = descriptionRef.current;
            setIsTruncated(element.scrollHeight > element.clientHeight);
        }
    }, []);

    return (
        <div className='hidden lg:block'>
            <p ref={descriptionRef} className={`my-5 ${isTruncated ? 'mb-1' : ''} line-clamp-[9]`}>
                {description || 'No description'}
            </p>
            {isTruncated && (
                <button
                    onClick={() => ref.current.scrollIntoView({ behavior: 'smooth' })} 
                    className='text-primary font-bold mb-5 hover:underline'
                >
                    See more
                </button>
            )}
        </div>
    )
}

export default forwardRef(AnnouncementSmallDescription);