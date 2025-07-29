import { describe, expect, it } from 'vitest';
import { GLOBAL_CONSTANTS, HTTP_METHODS, USER_TEST_DATA, ENDPOINTS } from './config';
import {makeRequest} from "./helpers/request.helper";

describe('User Management E2E', () => {
    let testUserId: string;
    const userIdRegex = GLOBAL_CONSTANTS.UUID_REGEX;

    it('should create user', async () => {
        const response = await makeRequest(
            ENDPOINTS.USERS.BASE,
            HTTP_METHODS.POST,
            {
                firstName: USER_TEST_DATA.DEFAULT_FIRST_NAME,
                lastName: USER_TEST_DATA.DEFAULT_LAST_NAME,
                idCode: USER_TEST_DATA.DEFAULT_ID_CODE
            }
        );

        expect(response.status).toBe(201);
        expect(await response.json()).toEqual({
            response: "User created successfully"
        });
    });

    it('should list users and get first user ID', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.USERS.BASE}?page=${GLOBAL_CONSTANTS.PAGE}&pageSize=${GLOBAL_CONSTANTS.PAGE_SIZE}`,
            HTTP_METHODS.GET
        );

        expect(response.status).toBe(200);
        const { response: data } = await response.json();
        testUserId = data.items[0].userId;

        expect(data).toEqual({
            items: expect.arrayContaining([
                expect.objectContaining({
                    userId: expect.stringMatching(userIdRegex),
                    firstName: USER_TEST_DATA.DEFAULT_FIRST_NAME,
                    lastName: USER_TEST_DATA.DEFAULT_LAST_NAME,
                    idCode: USER_TEST_DATA.DEFAULT_ID_CODE,
                    createdAt: expect.any(String)
                })
            ]),
            page: GLOBAL_CONSTANTS.PAGE,
            pageSize: GLOBAL_CONSTANTS.PAGE_SIZE,
            totalPages: expect.any(Number)
        });
    });

    it('should update user', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.USERS.BASE}?userId=${testUserId}`,
            HTTP_METHODS.PUT,
            {
                firstName: USER_TEST_DATA.UPDATED_FIRST_NAME,
                lastName: USER_TEST_DATA.UPDATED_LAST_NAME,
                idCode: USER_TEST_DATA.UPDATED_ID_CODE
            }
        );

        expect(response.status).toBe(204);
        expect(await response.text()).toBe('');
    });

    it('should get user by ID', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.USERS.BY_ID}?userId=${testUserId}`,
            HTTP_METHODS.GET
        );

        expect(response.status).toBe(200);
        expect((await response.json()).response).toEqual({
            userId: expect.stringMatching(userIdRegex),
            firstName: USER_TEST_DATA.UPDATED_FIRST_NAME,
            lastName: USER_TEST_DATA.UPDATED_LAST_NAME,
            idCode: USER_TEST_DATA.UPDATED_ID_CODE,
            createdAt: expect.any(String)
        });
    });

    it('should delete user', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.USERS.BASE}?userId=${testUserId}`,
            HTTP_METHODS.DELETE
        );

        expect(response.status).toBe(204);
        expect(await response.text()).toBe('');
    });
});