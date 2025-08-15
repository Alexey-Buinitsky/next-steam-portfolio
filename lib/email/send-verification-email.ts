// import { Resend } from 'resend';

// const resend = process.env.NODE_ENV === 'production' 
//   ? new Resend(process.env.RESEND_API_KEY) 
//   : null;

// export const sendVerificationEmail = async (email: string, token: string) => {
//   const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm?token=${token}&email=${encodeURIComponent(email)}`;
  
//   //реализация для этапа разработки
//   if (process.env.NODE_ENV === 'development') {
//     console.log('=== EMAIL VERIFICATION LINK ===');
//     console.log(confirmLink);
//     console.log('===============================');
//     console.log(token.slice(0, 8), 'token');
//     return;
//   }
  
//   // Production-режим
//   if (!resend) throw new Error('Resend client not initialized');

//   await resend.emails.send({
//     from: 'steamportfolio.com', // Использовать домен, который подтвердим в Resend
//     to: email,
//     subject: 'Confirm your email',
//     html: `
//       <p>Please click to verify your email:<a href="${confirmLink}">Confirm email</a></p>
//       <p>Or use this verification code: <strong>${token.slice(0, 8)}</strong></p>
//       <p style="margin-top: 20px; color: #666;">
//         If you didn't request this, please ignore this email.
//       </p>
//     `,
//   });
// };