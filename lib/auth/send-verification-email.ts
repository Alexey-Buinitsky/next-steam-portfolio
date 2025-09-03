import { Resend } from 'resend';
import { generateEmailVerificationCode } from './verification-email-code';

const resend = process.env.NODE_ENV === 'production' 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null

export const sendVerificationEmail = async ({ userId, email }: { userId: number; email: string }) => {
  try {
    const code = await generateEmailVerificationCode(userId, email)
  
    if (process.env.NODE_ENV === 'development') {
      console.log('Email verification code:', code) // Вот эта строка
      return
    } //удалить после получения домена
      
    if (!resend) throw new Error('Resend client not initialized')

    await resend.emails.send({
      from: 'no-reply@yourdomain.com',
      to: email,
      subject: 'Confirm your email',
      html: `
        <h1>Your verification code: ${code}</h1>
        <p>Enter this code in the application to complete registration.</p>
        <p>The code will expire in 24 hours.</p>
      `,
    })
  } catch (error) {
    console.error('Failed to send verification email:', error)
    throw error
  }
}