import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CreateCategory(){
    const [image, setImage] = useState(null);
    const { register, handleSubmit, setValue, clearErrors, formState: { errors }, reset } = useForm();
    const fileInputRef = useRef(null);

    function submitHandler(data){
        console.log(data);
        reset();
        setImage(null);
        if(fileInputRef.current){
            fileInputRef.current.value = '';
        }
    }

    function onImageChange(event){
        if(event.target.files && event.target.files[0]){
            setImage(URL.createObjectURL(event.target.files[0]));
            setValue('image', event.target.files[0]);
            clearErrors('image')
        }
    }

    function removeImage(){
        setImage(null);
        if(fileInputRef.current){
            fileInputRef.current.value = '';
        }
    }

    return (
        <>
            <h1 className='text-2xl font-bold mb-5'>Create a new category</h1>
            <form onSubmit={handleSubmit(submitHandler)} className='space-y-4'>
                <div>
                    <label htmlFor='name' className='font-bold mb-3'>Name</label>
                    <input {...register('name', {
                        required: 'A name is required'
                    })} type='text' name='name' id='name' className='w-full p-3 rounded-lg shadow' autoComplete='name' />
                    {errors.name && <div className='italic text-red-700'>{errors.name.message}</div>}
                </div>
                <div>
                    <label htmlFor='image' className='font-bold mb-3'>Image</label>
                    <div className='w-full'>
                        <input {...register('image', {
                            required: 'An image is required'
                        })} type='file' name='image' id='image' ref={fileInputRef} accept='image/*' onChange={onImageChange} className='w-min border bg-white rounded-lg shadow cursor-pointer file:border-none file:me-5 file:py-3 file:px-5 file:cursor-pointer file:bg-primary' />
                    </div>
                    {errors.image && <div className='italic text-red-700'>{errors.image.message}</div>}
                </div>
                {
                    image && (
                        <div className='relative w-24 h-24'>
                            <img src={image} alt='' className='w-full h-full object-cover rounded-lg border' />
                            <button type='button' onClick={removeImage} className='absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow hover:bg-red-700'>&#x2715;</button>
                        </div>
                    )
                }
                <div>
                    <button type='submit' className='bg-primary py-3 px-6 rounded-lg font-bold hover:scale-105 transition-all duration-300'>Create Category</button>
                </div>
            </form>
        </>
    )
}