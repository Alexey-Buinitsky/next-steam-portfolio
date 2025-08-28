import { SessionOptions } from 'iron-session'
// import { IronSessionData } from 'iron-session'

//Файл для настроек сессии
export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'steamfolio-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
      // httpOnly: true, // - в продакшн
      // sameSite: 'lax', // - в продакшн
      // maxAge: 60 * 60 * 24 * 7, // 1 week - при необходимости
  },
}

export interface UserSession {
  id: number;
  email: string;
  nickname?: string | null;
}

export interface IronSessionWithUser {
  user?: UserSession;  // Используем новый тип
}