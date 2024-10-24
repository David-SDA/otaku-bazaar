import React, { useState } from 'react'

export default function Contact() {
    const [contactData, setContactData] = useState({
        name: '',
        firstname: '',
        email: '',
        subject: '',
        message: ''
    });

    function inputChangeHandler(e){
        const { name, value } = e.target;
        setContactData((prevContactData) => ({
            ...prevContactData,
            [name]: value
        }));
    }

    function submitHandler(e){
        e.preventDefault();
    }

    return (
        <div className='container mx-auto pt-5'>
            <h1 className='text-center text-3xl font-bold'>Contact</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Name</label>
                    <input type='text' name='name' value={contactData.name} onChange={inputChangeHandler} />
                </div>
                <div>
                    <label>First Name</label>
                    <input type='text' name='firstname' value={contactData.firstname} onChange={inputChangeHandler} />
                </div>
                <div>
                    <label>Email</label>
                    <input type='email' name='email' value={contactData.email} onChange={inputChangeHandler} />
                </div>
                <div>
                    <label>Subject</label>
                    <input type='text' name='subject' value={contactData.subject} onChange={inputChangeHandler} />
                </div>
                <div>
                    <label>Message</label>
                    <textarea name='message' value={contactData.message} onChange={inputChangeHandler} />
                </div>
                <button type='submit'>Envoyer</button>
            </form>
        </div>
    )
}
