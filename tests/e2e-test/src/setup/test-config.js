import dotenv from 'dotenv';
dotenv.config();

export const headers = {
        'Content-Type': 'application/json',
        'cookie': process.env.COOKIE_VALUE
};