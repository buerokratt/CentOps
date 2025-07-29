import { getAuthToken } from './helpers/auth.helper';

beforeAll(async () => {
    await getAuthToken();
});