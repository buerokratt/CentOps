import {GLOBAL_CONSTANTS} from '../../setup/config';
import {getAuthHeaders} from './auth.helper';

export const makeRequest = async (
    endpoint: string,
    method: string,
    body?: any
): Promise<Response> => {
    return await fetch(
        `${GLOBAL_CONSTANTS.BASE_URL}${GLOBAL_CONSTANTS.API_PREFIX}${endpoint}`,
        {
            method,
            headers: await getAuthHeaders(),
            body: body ? JSON.stringify(body) : undefined
        }
    );
};