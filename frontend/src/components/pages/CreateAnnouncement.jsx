import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../ui/general/ErrorMessage';
import SuccessMessage from '../ui/general/SuccessMessage';
import LoadingAnimation from '../ui/general/LoadingAnimation';

export default function CreateAnnouncement(){
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const fileInputRef = useRef();

    const { register, handleSubmit, formState: { errors }, reset, getValues, setValue, clearErrors } = useForm();

    useEffect(() => {
        async function fetchCategories(){
            setLoading(true);
            try{
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`);
                if(!response.ok){
                    throw new Error('Error fetching categories');
                }

                const data = await response.json();
                setCategories(data);
            }
            catch(error){
                console.error(error.message);
            }
            finally{
                setLoading(false);
            }
        }
        fetchCategories();
    }, [])

    function handleImageChange(event){
        const files = Array.from(event.target.files);
        const validImages = files.filter(file => file.size <= 5 * 1024 * 1024);

        if(validImages.length !== files.length){
            setErrorMessage('Some images exceeded the 5MB size limit, they were not uploaded.');
        }
        else{
            setErrorMessage('');
        }

        const newImages = validImages.map((file) => URL.createObjectURL(file));
        setImages((prev) => [...prev, ...newImages].slice(0, 6));
        
        const currentImages = getValues('images') || [];
        setValue('images', [...currentImages, ...validImages]);

        if(validImages.length > 0){
            clearErrors('images');
        }

        fileInputRef.current.value = '';
    }

    function removeImage(indexToRemove){
        setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
        setValue('images', getValues('images').filter((_, index) => index !== indexToRemove));
    }

    async function submitHandler(formData){
        setErrorMessage('');
        setSuccessMessage('');
        setLoading(true);

        const formPayload = new FormData();
        formPayload.append('title', formData.title);
        formPayload.append('price', formData.price);
        formPayload.append('categoryId', formData.category);
        formPayload.append('description', formData.description);
        formData.images.forEach((image) => {
            formPayload.append('images', image);
        });

        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/announcements`, {
                method: 'POST',
                credentials: 'include',
                body: formPayload
            });

            if(!response.ok){
                throw new Error('Failed to create announcement.');
            }

            setSuccessMessage('Announcement created successfully!');
            reset();
            setImages([]);
        }
        catch(error){
            console.error(error.message);
            setErrorMessage(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <>
            {
                errorMessage && (
                    <ErrorMessage errorMessage={errorMessage} />
                )
            }
            {
                successMessage && (
                    <>
                        <SuccessMessage successMessage={successMessage} />
                    </>
                )
            }
            {
                isLoading ? (
                    <LoadingAnimation />
                ) : (
                    <>
                        <h1 className='text-2xl font-bold mb-5'>Create a new announcement</h1>
                        <form onSubmit={handleSubmit(submitHandler)} className='space-y-4'>
                            <div>
                                <label htmlFor='title' className='font-bold mb-3'>Title</label>
                                <input {...register('title', { 
                                        required: 'A title is required'
                                    })} type='text' id='title' name='title' className='w-full p-3 rounded-lg shadow' />
                                    {errors.title && <div className='italic text-red-700'>{errors.title.message}</div>}
                            </div>
                            <div>
                                <label htmlFor='price' className='font-bold mb-3'>Price</label>
                                <input {...register('price', {
                                        required: 'A price is required',
                                        min: {
                                            value: 0,
                                            message: 'Price must be greater than 0'
                                        }
                                    })} type='number' id='price' name='price' min={0} step={0.01} className='w-full p-3 rounded-lg shadow' />
                                    {errors.price && <div className='italic text-red-700'>{errors.price.message}</div>}
                            </div>
                            <div>
                                <label htmlFor='category' className='font-bold mb-3'>Category</label>
                                <select {...register('category', {
                                    required: 'A category is required'
                                })} id='category' name='category' className='w-full p-3 rounded-lg shadow' required>
                                    <option value=''>-- Select a category --</option>
                                    {
                                        categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <label htmlFor='images' className='font-bold mb-3'>Images</label>
                                <div className='w-full'>
                                    <input {...register('images', {
                                            required: 'At least one image is required'
                                        })} type='file' id='images' name='images' multiple={true} accept='image/*' onChange={handleImageChange} ref={fileInputRef} className='w-min border bg-white rounded-lg shadow cursor-pointer file:border-none file:me-5 file:py-3 file:px-5 file:cursor-pointer file:bg-primary' />
                                        {errors.images && <div className='italic text-red-700'>{errors.images.message}</div>}
                                </div>
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
                                <textarea {...register('description', {
                                        required: 'A description is required'
                                    })} id='description' name='description' rows={4} className='w-full p-3 rounded-lg shadow' />
                                {errors.description && <div className='italic text-red-700'>{errors.description.message}</div>}
                            </div>
                            <div>
                                <button type='submit' className='bg-primary py-3 px-6 rounded-lg font-bold hover:scale-105 transition-all duration-300'>Create Announcement</button>
                            </div>
                        </form>
                    </>
                )
            }
        </>
    )
}