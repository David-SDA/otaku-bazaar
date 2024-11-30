import React, { forwardRef, useEffect, useRef, useState } from 'react';

function AnnounceSmallDescription({fullDescriptionRef}, ref){
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
    )
}

export default forwardRef(AnnounceSmallDescription);