import axios, { AxiosInstance } from 'axios'

const baseURL = typeof window === 'undefined' ? `${process.env.NEXT_PUBLIC_APP_URL}${process.env.NEXT_PUBLIC_API_URL}` : process.env.NEXT_PUBLIC_API_URL

export const apiInstance: AxiosInstance = axios.create({
	baseURL: baseURL,
	withCredentials: true,
})