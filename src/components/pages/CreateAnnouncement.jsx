import React, { useRef, useState } from 'react';

export default function CreateAnnouncement(){
    const [images, setImages] = useState([]);
    const fileInputRef = useRef();

    function handleImageChange(event){
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => URL.createObjectURL(file));
        setImages((prev) => [...prev, ...newImages].slice(0, 6));
        fileInputRef.current.value = '';
    }

    function removeImage(indexToRemove){
        setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    }

    return (
        <>
            <h1 className='text-2xl font-bold mb-5'>Create a new announcement</h1>
            <form action='' className='space-y-4'>
                <div>
                    <label htmlFor='title' className='font-bold mb-3'>Title</label>
                    <input type='text' id='title' name='title' className='w-full p-3 rounded-lg shadow' required />
                </div>
                <div>
                    <label htmlFor='price' className='font-bold mb-3'>Price</label>
                    <input type='number' id='price' name='price' min={0} className='w-full p-3 rounded-lg shadow' required />
                </div>
                <div>
                    <label htmlFor='images' className='font-bold mb-3'>Images</label>
                    <input type='file' id='images' name='images' multiple accept='image/*' onChange={handleImageChange} ref={fileInputRef} className='w-full' required />
                </div>
                <div className='grid grid-cols-2 min-[432px]:grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-11 gap-4 place-items-center'>
                    {
                        images.map((src, index) => (
                            <div key={index} className='relative w-24 h-24'>
                                <img src={src} alt='' className='w-full h-full object-cover rounded-lg border' />
                                <button type='button' onClick={() => removeImage(index)} className='absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow hover:bg-red-700'>&#x2715;</button>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <label htmlFor='description' className='font-bold mb-3'>Description</label>
                    <textarea id='description' name='description' rows={4} className='w-full p-3 rounded-lg shadow' required />
                </div>
                <div>
                    <button type='submit' className='bg-primary py-3 px-6 rounded-lg font-bold hover:scale-105 transition-all duration-300'>Create Announcement</button>
                </div>
            </form>
        </>
    )
}