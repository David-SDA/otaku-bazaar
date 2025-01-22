import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import LoadingAnimation from '../ui/general/LoadingAnimation';
import ErrorMessage from '../ui/general/ErrorMessage';
import SuccessMessage from '../ui/general/SuccessMessage';

export default function Register(){
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();

    async function submitHandler(data){
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try{
            const response = await fetch('http://localhost:8000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if(!response.ok){
                const errorData = await response.json();
                setErrorMessage(errorData.error);
                throw new Error(errorData.error);
            }

            reset();
            setSuccessMessage('Registration successful, you can login');
        }
        catch(error){
            console.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div className='mx-auto max-w-[500px]'>
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
                        <form onSubmit={handleSubmit(submitHandler)} className='bg-[#F7EDE2] border border-[#F5CAC3] rounded-lg my-5 py-10 px-4 sm:px-7'>
                            <h1 className='text-center text-xl sm:text-2xl font-bold mb-10'>Register</h1>
                            <div className='mb-5 flex flex-col'>
                                <label htmlFor='email' className='mb-1 font-bold'>Email<span className='text-red-700'>*</span></label>
                                <input {...register('email', {
                                    required: 'An email is required',
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,5}$/,
                                        message: 'Email format is not right'
                                    }
                                })} type='email' id='email' autoComplete='email' className='w-full p-3 rounded-lg shadow' />
                                {errors.email && <div className='italic text-red-700'>{errors.email.message}</div>}
                            </div>
                            <div className='mb-5 flex flex-col'>
                                <label htmlFor='username' className='mb-1 font-bold'>Username<span className='text-red-700'>*</span></label>
                                <input {...register('username', {
                                    required: 'A username is required'
                                })} type='text' id='username' autoComplete='username' className='w-full p-3 rounded-lg shadow' />
                                {errors.username && <div className='italic text-red-700'>{errors.username.message}</div>}
                            </div>
                            <div className='mb-5 flex flex-col'>
                                <label htmlFor='contactEmail' className='mb-1 font-bold'>Contact Email<span className='text-red-700'>*</span></label>
                                <input {...register('contactEmail', {
                                    required: 'An email is required',
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,5}$/,
                                        message: 'Email format is not right'
                                    }
                                })} type='email' id='contactEmail' autoComplete='contactEmail' className='w-full p-3 rounded-lg shadow' />
                                {errors.contactEmail && <div className='italic text-red-700'>{errors.contactEmail.message}</div>}
                            </div>
                            <div className='mb-5 flex flex-col'>
                                <label htmlFor='password' className='mb-1 font-bold'>Password<span className='text-red-700'>*</span></label>
                                <input {...register('password', {
                                    required: 'A password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password need at least 8 characters'
                                    },
                                    pattern: {
                                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                        message: 'Password need at least one uppercase letter, one lowercase letter, one number and one special character'
                                    }
                                })} type='password' id='password' autoComplete='new-password' className='w-full p-3 rounded-lg shadow' />
                                {errors.password && <div className='italic text-red-700'>{errors.password.message}</div>}
                            </div>
                            <div className='mb-5 flex flex-col'>
                                <label htmlFor='confirmPassword' className='mb-1 font-bold'>Confirm password<span className='text-red-700'>*</span></label>
                                <input {...register('confirmPassword', {
                                    required: 'Password needs to be confirmed',
                                    validate: (value) => value === getValues('password') || 'Passwords do not match'
                                })} type='password' id='confirmPassword' autoComplete='new-password' className='w-full p-3 rounded-lg shadow' />
                                {errors.confirmPassword && <div className='italic text-red-700'>{errors.confirmPassword.message}</div>}
                            </div>
                            <div className='mb-8'>
                                <label htmlFor='use' className='cursor-pointer flex items-center'>
                                    <input {...register('use', {
                                        required: 'You need to accept condition of use'
                                    })} type='checkbox' id='use' className='cursor-pointer h-6 w-6' />
                                    <div className='ms-3'>I accept terms of use</div>
                                </label>
                                {errors.use && <div className='italic text-red-700'>{errors.use.message}</div>}
                            </div>
                            <div className='flex justify-center'>
                                <button type='submit' className='bg-primary py-3 px-6 rounded-lg font-bold hover:scale-105 transition-all duration-300' disabled={isLoading}>Register</button> 
                            </div>
                        </form>
                        <p className='italic'>
                            Already have an account ? <Link to={'/login'} className='underline text-primary'>Login here</Link>
                        </p>
                    </>
                )
            }
        </div>
    )
}
