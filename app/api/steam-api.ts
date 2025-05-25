import axios, { AxiosInstance } from 'axios';

const steamApi: AxiosInstance = axios.create({
    baseURL: 'https://steamcommunity.com/market/',
    timeout: 10000,
    headers: {
        'User-Agent': 'Steam-Porfolio/1.0',
        'Accept': 'application/json',
    },
    params: {
        appid: 730,
        norender: 1
    }
});

export async function getPopularCases(params: object) {
  try {
    const response = await steamApi.get('/search/render/', {
        params: {
            start: 0,
            ...params
        }
    });
    return response;
    } catch (error) {
        console.error('Steam API error:', error);
        throw error;
    } 
}