import React from 'react'
import { useForm } from 'react-hook-form'

export default function Register() {
    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();

    function submitHandler(data){
        console.log(data);
        reset();
    }

    return (
        <div className='container mx-auto text-neutral-800'>
            <form onSubmit={handleSubmit(submitHandler)} className='mx-auto bg-[#F7EDE2] border border-[#F5CAC3] w-[500px] rounded-lg mt-10 py-10 px-7'>
                <h1 className='text-center text-3xl font-bold mb-10'>Register</h1>
                <div className='mb-5 flex flex-col'>
                    <label htmlFor='email' className='mb-1 font-bold'>Email</label>
                    <input {...register('email', {
                        required: 'An email is required',
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'Email format is not right'
                        }
                    })} type='email' id='email' autoComplete='email' className='w-full p-3 rounded-lg' />
                    {errors.email && <div className='italic text-red-700'>{errors.email.message}</div>}
                </div>
                <div className='mb-5 flex flex-col'>
                    <label htmlFor='username' className='mb-1 font-bold'>Username</label>
                    <input {...register('username', {
                        required: 'A username is required'
                    })} type='text' id='username' autoComplete='username' className='w-full p-3 rounded-lg' />
                    {errors.username && <div className='italic text-red-700'>{errors.username.message}</div>}
                </div>
                <div className='mb-5 flex flex-col'>
                    <label htmlFor='password' className='mb-1 font-bold'>Password</label>
                    <input {...register('password', {
                        required: 'A password is required',
                        minLength: {
                            value: 8,
                            message: 'Password need at least 8 characters'
                        },
                        pattern: {
                            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/,
                            message: 'Password need at least one uppercase letter, one lowercase lettre, one number and one special character'
                        }
                    })} type='password' id='password' autoComplete='new-password' className='w-full p-3 rounded-lg' />
                    {errors.password && <div className='italic max-w-[442px] text-red-700'>{errors.password.message}</div>}
                </div>
                <div className='mb-5 flex flex-col'>
                    <label htmlFor='confirmPassword' className='mb-1 font-bold'>Confirm password</label>
                    <input {...register('confirmPassword', {
                        required: 'Password needs to be confirmed',
                        validate: (value) => value === getValues('password') || 'Passwords do not match'
                    })} type='password' id='confirmPassword' autoComplete='new-password' className='w-full p-3 rounded-lg' />
                    {errors.confirmPassword && <div className='italic text-red-700'>{errors.confirmPassword.message}</div>}
                </div>
                <div className='mb-8'>
                    <label htmlFor='use' className='cursor-pointer flex items-center'>
                        <input {...register('use', {
                            required: 'You need to accept condition of use'
                        })} type='checkbox' id='use' className='cursor-pointer h-6 w-6' />
                        <div className='ms-3'>I accept condition of use</div>
                    </label>
                    {errors.use && <div className='italic text-red-700'>{errors.use.message}</div>}
                </div>
                <div className='flex justify-center'>
                    <button type='submit' className='bg-[#F6BD60] py-3 px-6 rounded-lg font-bold'>Submit</button> 
                </div>
            </form>
        </div>

    )
}
