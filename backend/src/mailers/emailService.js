import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

export async function sendPasswordResetEmail(to, resetLink){
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: to,
        subject: 'Password Reset',
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p><p>This link expires in 1 hour</p>`
    };
    try{
        await transport.sendMail(mailOptions);
    }
    catch(error){
        throw new Error(`Error sending password reset email : ${error.message}`);
    }
}