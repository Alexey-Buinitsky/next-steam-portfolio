// import { Resend } from 'resend';
// import { generateEmailVerificationCode } from '@/lib';

// const resend = process.env.NODE_ENV === 'production' 
//   ? new Resend(process.env.RESEND_API_KEY) 
//   : null

// export const sendVerificationEmail = async ({ userId, email }: { userId: number; email: string }) => {
//   try {
//     const code = await generateEmailVerificationCode(userId, email)
  
//     if (process.env.NODE_ENV === 'development') {
//       console.log('Email verification code:', code) // Вот эта строка
//       return
//     } //удалить после получения домена
      
//     if (!resend) throw new Error('Resend client not initialized')

//     await resend.emails.send({
//       from: 'no-reply@yourdomain.com',
//       to: email,
//       subject: 'Confirm your email',
//       html: `
//         <h1>Your verification code: ${code}</h1>
//         <p>Enter this code in the application to complete registration.</p>
//         <p>The code will expire in 24 hours.</p>
//       `,
//     })
//   } catch (error) {
//     console.error('Failed to send verification email:', error)
//     throw error
//   }
// }

import { generateEmailVerificationCode } from '@/lib';

interface ResendEmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

interface Resend {
  emails: {
    send: (options: ResendEmailOptions) => Promise<unknown>
  }
}

let resendInstance: Resend | null = null

const getResend = async (): Promise<Resend | null> => {
  if (process.env.NODE_ENV === 'development') {
    return null
  }
  
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set')
    return null
  }
  
  if (resendInstance) {
    return resendInstance
  }
  
  try {
    const { Resend } = await import('resend');
    resendInstance = new Resend(process.env.RESEND_API_KEY) as Resend
    return resendInstance
  } catch (error) {
    console.error('Failed to import Resend:', error)
    return null
  }
}

export const sendVerificationEmail = async ({ userId, email }: { userId: number; email: string }) => {
  try {
    const code = await generateEmailVerificationCode(userId, email)
  
    if (process.env.NODE_ENV === 'development') {
      console.log('Email verification code:', code)
      return
    }
      
    const resend = await getResend()
    if (!resend) {
      console.warn('Resend client not available - skipping email sending')
      return
    }

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
  }
}