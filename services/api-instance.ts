import axios, { AxiosInstance } from 'axios'

export const apiInstance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
})