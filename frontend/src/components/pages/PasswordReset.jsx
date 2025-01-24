import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../ui/general/ErrorMessage';
import LoadingAnimation from '../ui/general/LoadingAnimation';

export default function PasswordReset(){
    const params = useParams();
    const token = params.token;
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();

    async function submitHandler(){
        setLoading(true);
        setErrorMessage('');

        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token:token, password: getValues('password') })
            });
            if(!response.ok){
                const errorData = await response.json();
                setErrorMessage(errorData.error);
                throw new Error(errorData.error);
            }

            reset();
            navigate('/login');
        }
        catch(error){
            console.error(error.message);
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div className='mx-auto max-w-[500px]'>
            {
                errorMessage && (
                    <ErrorMessage />
                )
            }
            {
                isLoading ? (
                    <LoadingAnimation />
                ) : (
                    <form onSubmit={handleSubmit(submitHandler)} className='bg-[#F7EDE2] border border-[#F5CAC3] rounded-lg my-5 py-10 px-4 sm:px-7'>
                        <h1 className='text-center text-xl sm:text-2xl font-bold mb-10'>Reset your password</h1>
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
                        <div className='flex justify-center'>
                            <button type='submit' className='bg-primary py-3 px-6 rounded-lg font-bold hover:scale-105 transition-all duration-300'>Submit</button> 
                        </div>
                    </form>
                )
            }
        </div>
    )
}
