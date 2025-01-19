import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../ui/general/ErrorMessage';
import LoadingAnimation from '../ui/general/LoadingAnimation';
import { useAuth } from '../../context/AuthContext';

export default function Login(){
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    // à améliorer
    useEffect(() => {
        if(isAuthenticated){
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    async function submitHandler(data){
        setLoading(true);
        setErrorMessage('');

        try{
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            if(!response.ok){
                const errorData = await response.json();
                setErrorMessage(errorData.error);
                throw new Error(errorData.error);
            }

            reset();
            navigate('/');
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
                isLoading && (
                    <LoadingAnimation />
                )
            }
            {
                !isLoading && (
                    <>
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
                                <button type='submit' className='bg-primary py-3 px-6 rounded-lg font-bold hover:scale-105 transition-all duration-300'>Login</button> 
                            </div>
                        </form>
                        <p className='italic'>
                            No account ? <Link to={'/register'} className='underline text-primary'>Register here</Link>
                        </p>
                    </>
                )
            }
        </div>
    )
}
