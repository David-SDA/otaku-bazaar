import React from 'react';
import { useForm } from 'react-hook-form';

export default function Contact(){
    // Elements nécessaires pour le traitement du formulaire
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // Traitement du formulaire
    function submitHandler(data){
        // Traitement à faire
        console.log(data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className='mx-auto bg-[#F7EDE2] border border-[#F5CAC3] max-w-[500px] rounded-lg my-5 py-10 px-4 sm:px-7'>
            <h1 className='text-center text-xl sm:text-2xl font-bold mb-10'>Contact Us</h1>
            <div className='mb-5 flex flex-col'>
                <label htmlFor='name' className='mb-1 font-bold'>
                    Name
                </label>
                <input {...register('name', {
                    required: 'A name is required',
                })} type='text' id='name' autoComplete='name' className='w-full p-3 rounded-lg shadow' />
                {errors.name && <div className='italic text-red-700'>{errors.name.message}</div>}
            </div>
            <div className='mb-5 flex flex-col'>
                <label htmlFor='firstName' className='mb-1 font-bold'>
                    First Name
                </label>
                <input {...register('firstName', {
                    required: 'A first name is required'
                })} type='text' id='firstName' autoComplete='firstName' className='w-full p-3 rounded-lg shadow' />
                {errors.firstName && <div className='italic text-red-700'>{errors.firstName.message}</div>}
            </div>
            <div className='mb-5 flex flex-col'>
                <label htmlFor='email' className='mb-1 font-bold'>Email</label>
                <input {...register('email', {
                    required: 'An email is required',
                    pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: 'Email format is not right'
                    }
                })} type='email' id='email' autoComplete='email' className='w-full p-3 rounded-lg shadow' />
                {errors.email && <div className='italic text-red-700'>{errors.email.message}</div>}
            </div>
            <div className='mb-5 flex flex-col'>
                <label htmlFor='subject' className='mb-1 font-bold'>
                    Subject
                </label>
                <input {...register('subject', {
                    required: 'A first name is required'
                })} type='text' id='subject' autoComplete='subject' className='w-full p-3 rounded-lg shadow' />
                {errors.subject && <div className='italic text-red-700'>{errors.subject.message}</div>}
            </div>
            <div className='mb-5 flex flex-col'>
                <label htmlFor='message' className='mb-1 font-bold'>
                    Message
                </label>
                <textarea {...register('message', {
                    required: 'A first name is required'
                })} type='text' id='message' autoComplete='message' className='w-full p-3 rounded-lg shadow' />
                {errors.message && <div className='italic text-red-700'>{errors.message.message}</div>}
            </div>
            <div className='flex justify-center'>
                <button type='submit' className='bg-primary py-3 px-6 rounded-lg font-bold'>
                    Send
                </button> 
            </div>
        </form>
    )
}
