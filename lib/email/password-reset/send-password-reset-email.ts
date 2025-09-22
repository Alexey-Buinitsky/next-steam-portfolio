// import { Resend } from 'resend';
// import { generatePasswordResetCode } from '@/lib';

// const resend = process.env.NODE_ENV === 'production' 
//   ? new Resend(process.env.RESEND_API_KEY) 
//   : null

// export const sendPasswordResetEmail = async ({ userId, email }: { userId: number; email: string }) => {
//   try {
//     const code = await generatePasswordResetCode(userId, email)

//     if (process.env.NODE_ENV === 'development') {
//       console.log('Password reset code:', code)
//       return
//     }

//     if (!resend) throw new Error('Resend client not initialized')

//     await resend.emails.send({
//       from: 'no-reply@yourdomain.com',
//       to: email,
//       subject: 'Password Reset Request',
//       html: `
//         <h1>Your password reset code: ${code}</h1>
//         <p>Enter this code in the application to reset your password.</p>
//         <p>The code will expire in 1 hour.</p>
//         <p>If you didn't request this, please ignore this email.</p>
//       `,
//     })
//   } catch (error) {
//     console.error('Failed to send password reset email:', error)
//     throw error
//   }
// }

// import { generatePasswordResetCode } from '@/lib';

// interface ResendEmailOptions {
//   from: string;
//   to: string;
//   subject: string;
//   html: string;
// }

// interface Resend {
//   emails: {
//     send: (options: ResendEmailOptions) => Promise<unknown>
//   }
// }

// let resendInstance: Resend | null = null;

// const getResend = async (): Promise<Resend | null> => {
//   if (process.env.NODE_ENV === 'development') {
//     return null;
//   }

//   if (!process.env.RESEND_API_KEY) {
//     console.error('RESEND_API_KEY is not set');
//     return null;
//   }

//   if (resendInstance) {
//     return resendInstance
//   }

//   try {
//     const { Resend } = await import('resend')
//     resendInstance = new Resend(process.env.RESEND_API_KEY) as Resend
//     return resendInstance
//   } catch (error) {
//     console.error('Failed to import Resend:', error)
//     return null
//   }
// }

// export const sendPasswordResetEmail = async ({ userId, email }: { userId: number; email: string }) => {
//   try {
//     const code = await generatePasswordResetCode(userId, email)

//     if (process.env.NODE_ENV === 'development') {
//       console.log('Password reset code:', code)
//       return
//     }

//     const resend = await getResend()
//     if (!resend) {
//       console.warn('Resend client not available - skipping email sending')
//       return
//     }

//     await resend.emails.send({
//       from: 'no-reply@yourdomain.com',
//       to: email,
//       subject: 'Password Reset Request',
//       html: `
//         <h1>Your password reset code: ${code}</h1>
//         <p>Enter this code in the application to reset your password.</p>
//         <p>The code will expire in 1 hour.</p>
//         <p>If you didn't request this, please ignore this email.</p>
//       `,
//     })
//   } catch (error) {
//     console.error('Failed to send password reset email:', error)
//   }
// }

import { generatePasswordResetCode } from '@/lib';

export const sendPasswordResetEmail = async ({ userId, email }: { userId: number; email: string }) => {
	try {
		const code = await generatePasswordResetCode(userId, email)

		if (process.env.NODE_ENV === 'development') {
			console.log('Password reset code:', code)
		}

		return code

	} catch (error) {
		console.error('Failed to send password reset email:', error)
		return null
	}
}