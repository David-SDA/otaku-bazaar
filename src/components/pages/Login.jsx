import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function Login(){
    // Elements nécessaires pour le traitement du formulaire
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // Traitement du formulaire
    function submitHandler(data){
        // Traitement à faire
        console.log(data);
        reset();
    }
    
    return (
        <div className='mx-auto max-w-[500px]'>
            <form onSubmit={handleSubmit(submitHandler)} className='bg-[#F7EDE2] border border-[#F5CAC3] rounded-lg my-5 py-10 px-4 sm:px-7'>
                <h1 className='text-center text-xl sm:text-2xl font-bold mb-10'>Login</h1>
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
                    <label htmlFor='password' className='mb-1 font-bold'>Password</label>
                    <input {...register('password', {
                        required: 'A password is required',
                    })} type='password' id='password' autoComplete='new-password' className='w-full p-3 rounded-lg shadow' />
                    {errors.password && <div className='italic text-red-700'>{errors.password.message}</div>}
                </div>
                <div className='flex justify-center'>
                    <button type='submit' className='bg-primary py-3 px-6 rounded-lg font-bold'>Login</button> 
                </div>
            </form>
            <p className='italic'>
                No account ? <Link to='/register' className='underline text-primary'>Register here</Link>
            </p>
        </div>
    )
}
