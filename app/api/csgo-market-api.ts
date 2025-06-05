import axios from "axios";
import { AxiosInstance } from "axios";

const csgoMarketApi: AxiosInstance = axios.create({
    baseURL: 'https://csgomarket.com/api/v2',
    timeout: 10000,
    headers: {
        'User-Agent': 'Steam-Portfolio/1.0',
        'Accept': 'application/json'
    }
})

export async function getCsgoMarketItems(endpoint: string, params: object = {}) {
    try {
        const response = await csgoMarketApi.get(endpoint, { params })
        return response.data
    }   catch (error) {
        console.error('CSGO Market API error:', error);
        throw error;
    }
}