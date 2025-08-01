import { getAuthToken } from '../tests/helpers/auth.helper';
import { beforeAll } from 'vitest';

beforeAll(async () => {
    await getAuthToken();
});