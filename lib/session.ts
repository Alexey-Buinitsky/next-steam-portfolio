import { SessionOptions } from 'iron-session'
import { IronSessionData } from 'iron-session'

//Файл для настроек сессии
export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'steamfolio-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number
      login: string
    }
  }
}

export interface IronSessionWithUser extends IronSessionData {
  user: {
    id: number
    login: string
  }
}