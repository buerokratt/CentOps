import { describe, expect, it } from 'vitest';
import { ENDPOINTS, GLOBAL_CONSTANTS, HTTP_METHODS } from '../setup/config';
import { makeRequest } from './helpers/request.helper';

describe('Log Management E2E', () => {
    let testUserLogId: string;

    it('should list user logs with pagination (200)', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.LOGS.USER}?page=${GLOBAL_CONSTANTS.PAGE}&pageSize=${GLOBAL_CONSTANTS.PAGE_SIZE}`,
            HTTP_METHODS.GET
        );

        expect(response.status).toBe(200);
        const {response: data} = await response.json();

        expect(data).toEqual({
            items: expect.any(Array),
            page: GLOBAL_CONSTANTS.PAGE,
            pageSize: GLOBAL_CONSTANTS.PAGE_SIZE,
            totalPages: expect.any(Number)
        });

        if (data.items.length > 0) {
            testUserLogId = data.items[0].logId;
            expect(data.items[0]).toEqual({
                logId: expect.stringMatching(GLOBAL_CONSTANTS.UUID_REGEX),
                method: expect.any(String),
                path: expect.any(String),
                createdAt: expect.any(String),
                firstName: expect.any(String),
                lastName: expect.any(String),
                userIdCode: expect.any(String)
            });
        }
    });

    it('should list secret logs with pagination (200)', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.LOGS.SECRETS}?page=${GLOBAL_CONSTANTS.PAGE}&pageSize=5`,
            HTTP_METHODS.GET
        );

        expect(response.status).toBe(200);
        const {response: data} = await response.json();

        expect(data).toEqual({
            items: expect.any(Array),
            page: 1,
            pageSize: 5,
            totalPages: expect.any(Number)
        });

        if (data.items.length > 0) {
            expect(data.items[0]).toEqual({
                id: expect.stringMatching(GLOBAL_CONSTANTS.UUID_REGEX),
                createdAt: expect.any(String),
                firstName: expect.any(String),
                lastName: expect.any(String),
                clientName: expect.any(String),
                userIdCode: expect.any(String),
                ipAddress: expect.any(String),
                action: expect.any(String),
                userAgent: expect.any(String)
            });
        }
    });

    it('should delete user log (204)', async () => {
        if (!testUserLogId) {
            console.warn('Skipping delete test - no user logs available');
            return;
        }

        const response = await makeRequest(
            `${ENDPOINTS.LOGS.USER}?logId=${testUserLogId}`,
            HTTP_METHODS.DELETE
        );

        expect(response.status).toBe(204);
        expect(await response.text()).toBe('');
    });
});