import { getCookie } from "cookies-next";

const env = process.env.NEXT_PUBLIC_ENV as string;

export const urls = {
    baseUrl:'https://api.coding-4u.com',
    zoomBaseUrl: 'https://api.zoom.us/v2'
}

export const authHeader = {
    Authorization: `Bear ${getCookie('accessToken')}`
}

export const refreshHeader = {
    Authorization: `Bear ${getCookie('refreshToken')}`
}