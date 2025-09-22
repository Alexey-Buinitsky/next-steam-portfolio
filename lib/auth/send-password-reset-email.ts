// import { Resend } from 'resend';
// import { generatePasswordResetCode } from './index';

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





// // lib/auth/send-verification-email.ts
// import { generatePasswordResetCode } from './index';

// // Тип для Resend
// interface ResendEmailOptions {
//   from: string;
//   to: string;
//   subject: string;
//   html: string;
// }

// interface Resend {
//   emails: {
//     send: (options: ResendEmailOptions) => Promise<unknown>;
//   };
// }

// // Глобальная переменная для хранения Resend (инициализируется один раз)
// let resendInstance: Resend | null = null;

// // Функция для получения экземпляра Resend
// const getResend = async (): Promise<Resend | null> => {
//   if (process.env.NODE_ENV === 'development') {
//     return null;
//   }
  
//   if (!process.env.RESEND_API_KEY) {
//     console.error('RESEND_API_KEY is not set');
//     return null;
//   }
  
//   // Если уже инициализирован, возвращаем экземпляр
//   if (resendInstance) {
//     return resendInstance;
//   }
  
//   try {
//     // Используем динамический импорт ES6
//     const { Resend } = await import('resend');
//     resendInstance = new Resend(process.env.RESEND_API_KEY) as Resend;
//     return resendInstance;
//   } catch (error) {
//     console.error('Failed to import Resend:', error);
//     return null;
//   }
// };

// export const sendPasswordResetEmail = async ({ userId, email }: { userId: number; email: string }) => {
//   try {
//     const code = await generatePasswordResetCode(userId, email);

//     if (process.env.NODE_ENV === 'development') {
//       console.log('Password reset code:', code);
//       return;
//     }
      
//     const resend = await getResend();
//     if (!resend) {
//       console.warn('Resend client not available - skipping email sending');
//       return;
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
//     });
//   } catch (error) {
//     console.error('Failed to send password reset email:', error);
//     // Не бросаем ошибку дальше, чтобы не ломать приложение
//   }
// };




import { generatePasswordResetCode } from './index';

export const sendPasswordResetEmail = async ({ userId, email }: { userId: number; email: string }) => {
  try {
    const code = await generatePasswordResetCode(userId, email);

    if (process.env.NODE_ENV === 'development') {
      console.log('Password reset code:', code);
    }
    
    // Возвращаем код для отображения в UI
    return code;
    
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    return null;
  }
};