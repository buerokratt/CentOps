import { GLOBAL_CONSTANTS, HTTP_METHODS, ENDPOINTS } from '../config';

let authToken: string | null = null;

export const getAuthToken = async (): Promise<string> => {
    if (authToken) return authToken;

    const response = await fetch(
        `${GLOBAL_CONSTANTS.BASE_URL}${GLOBAL_CONSTANTS.API_PREFIX}${ENDPOINTS.AUTH}`,
        {
            method: HTTP_METHODS.POST,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                login: "EE30303039914",
                password: "OK"
            })
        }
    );

    const data = await response.json();
    authToken = data.response;

    if (!authToken) {
        throw new Error('Authentication failed: No token received');
    }

    return authToken;
};

export const getAuthHeaders = async () => {
    const token = await getAuthToken();
    return {
        'Content-Type': 'application/json',
        'Cookie': `customJwtCookie=${token}`
    };
};