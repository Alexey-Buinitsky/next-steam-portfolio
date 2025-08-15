import { SessionOptions } from 'iron-session'
// import { IronSessionData } from 'iron-session'

//Файл для настроек сессии
export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'steamfolio-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
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