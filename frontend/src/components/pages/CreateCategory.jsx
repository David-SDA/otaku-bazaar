import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../ui/general/ErrorMessage';
import SuccessMessage from '../ui/general/SuccessMessage';
import LoadingAnimation from '../ui/general/LoadingAnimation';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateCategory(){
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [isLoading, setLoading] = useState(id ? true : false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { register, handleSubmit, setValue, clearErrors, formState: { errors }, reset } = useForm();
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(id){
            async function fetchCategory(){
                try{
                    const response = await fetch(`http://localhost:8000/categories/${id}`, {
                        credentials: 'include'
                    });
                    if(!response.ok){
                        throw new Error('Failed to fetch category');
                    }

                    const categoryData = await response.json();
                    setValue('name', categoryData.name);
                    setValue('image', categoryData.image);
                    setImage(categoryData.image);
                }
                catch(error){
                    console.error(error.message);
                }
                finally{
                    setLoading(false);
                }
            }
            fetchCategory();
        }
    }, [id, setValue]);

    async function submitHandler(data){
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('image', data.image);

        try{
            const url = id ? `http://localhost:8000/categories/${id}` : 'http://localhost:8000/categories';
            const method = id ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method:  method,
                credentials: 'include',
                body: formData
            });

            if(!response.ok){
                const errorData = await response.json();
                setErrorMessage(errorData.error);
                throw new Error(errorData.error || 'Failed to create category');
            }

            reset();
            setImage(null);
            if(id){
                navigate('/categories');
            }
            setSuccessMessage('Category created successfully');
            if(fileInputRef.current){
                fileInputRef.current.value = '';
            }
        }
        catch(error){
            console.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    function validateImage(file){
        const maxSize = 5 * 1024 * 1024;
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];

        if(file && file.size > maxSize){
            return 'The file is too large. Please select a file smaller than 5MB.';
        }

        if(file && !allowedMimeTypes.includes(file.type)){
            return 'Only JPEG, JPG, and PNG images are allowed.';
        }

        return true;
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
        setValue('image', null);
        clearErrors('image');
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
                        <h1 className='text-2xl font-bold mb-5'>
                            {id ? 'Edit Category' : 'Create Category'}
                        </h1>
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
                                    <input {...register('image',
                                        id ? { validate: validateImage } : { required: 'An image is required', validate: validateImage}
                                    )} type='file' name='image' id='image' ref={fileInputRef} accept='image/*' onChange={onImageChange} className='w-min border bg-white rounded-lg shadow cursor-pointer file:border-none file:me-5 file:py-3 file:px-5 file:cursor-pointer file:bg-primary' />
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
                                <button type='submit' className='bg-primary py-3 px-6 rounded-lg font-bold hover:scale-105 transition-all duration-300'>
                                    {id ? 'Edit Category' : 'Create Category'}
                                </button>
                            </div>
                        </form>
                    </>
                )
            }
        </>
    )
}