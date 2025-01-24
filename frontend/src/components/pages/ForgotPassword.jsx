import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../ui/general/ErrorMessage';
import LoadingAnimation from '../ui/general/LoadingAnimation';

export default function RequestPasswordReset(){
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();

    async function submitHandler(){
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/request-reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: getValues('email') })
            });
            if(!response.ok){
                const errorData = await response.json();
                setErrorMessage(errorData.error);
                throw new Error(errorData.error);
            }

            reset();
            setSuccessMessage('Password reset email sent');
        }
        catch(error){
            console.error(error.message);
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <div className='mx-auto max-w-[500px]'>
            {
                errorMessage && (
                    <ErrorMessage errorMessage={errorMessage} />
                )
            }
            {
                successMessage && (
                    <div className='mb-5 p-3 text-center rounded-lg bg-green-100 border border-green-400 text-green-700'>
                        {successMessage}
                    </div>
                )
            }
            {
                isLoading ? (
                    <LoadingAnimation />
                ) : (
                    <form onSubmit={handleSubmit(submitHandler)} className='bg-[#F7EDE2] border border-[#F5CAC3] rounded-lg my-5 py-10 px-4 sm:px-7'>
                        <h1 className='text-center text-xl sm:text-2xl font-bold mb-10'>Request Password Reset</h1>
                        <div className='mb-5 flex flex-col'>
                            <label htmlFor='email' className='mb-1 font-bold'>Email</label>
                            <input {...register('email', {
                                required: 'An email is required',
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,5}$/,
                                    message: 'Email format is not right'
                                }
                            })} type='email' id='email' autoComplete='email' className='w-full p-3 rounded-lg shadow' />
                            {errors.email && <div className='italic text-red-700'>{errors.email.message}</div>}
                        </div>
                        <div className='flex justify-center'>
                            <button type='submit' className='bg-primary py-3 px-6 rounded-lg font-bold hover:scale-105 transition-all duration-300'>Submit</button> 
                        </div>
                    </form>
                )
            }
        </div>
    );
}
