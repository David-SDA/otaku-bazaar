import React from 'react'
import { useForm } from 'react-hook-form'

export default function Register() {
    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();

    function submitHandler(data){
        console.log(data);
        reset();
    }

    return (
        <div className='container mx-auto'>
            <h1 className='text-center text-3xl font-bold'>Register</h1>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <label>Email</label>
                    <input {...register('email', {
                        required: 'An email is required',
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'Email format is not right'
                        }
                    })} type="email" placeholder='email@email.com' autoComplete='email' />
                    {errors.email && <div>{errors.email.message}</div>}
                </div>
                <div>
                    <label>Username</label>
                    <input {...register('username', {
                        required: 'A username is required'
                    })} type="text" placeholder='Your username' autoComplete='username' />
                    {errors.username && <div>{errors.username.message}</div>}
                </div>
                <div>
                    <label>Password</label>
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
                    })} type="password" placeholder='Your password' autoComplete='new-password' />
                    {errors.password && <div>{errors.password.message}</div>}
                </div>
                <div>
                    <label>Confirm password</label>
                    <input {...register('confirmPassword', {
                        required: 'Password needs to be confirmed',
                        validate: (value) => value === getValues('password') || 'Passwords do not match'
                    })} type="password" placeholder='Confirm password' autoComplete='new-password' />
                    {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
                </div>
                <button type='submit'>Submit</button> 
            </form>
        </div>

    )
}
