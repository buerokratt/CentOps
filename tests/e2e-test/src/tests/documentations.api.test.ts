import { describe, expect, it } from 'vitest';
import {DOCUMENTATION_TEST_DATA, ENDPOINTS, GLOBAL_CONSTANTS, HTTP_METHODS} from '../setup/config';
import { makeRequest } from './helpers/request.helper';

describe('Documentation Management E2E', () => {
    let testDocumentId: string;

    it('should create documentation (201)', async () => {
        const response = await makeRequest(
            ENDPOINTS.DOCUMENTATION.BASE,
            HTTP_METHODS.POST,
            {
                content: DOCUMENTATION_TEST_DATA.INITIAL_CONTENT
            }
        );

        expect(response.status).toBe(201);
        expect(await response.json()).toEqual({
            response: "Documentation created successfully"
        });
    });

    it('should get documentation and verify structure (200)', async () => {
        const response = await makeRequest(
            ENDPOINTS.DOCUMENTATION.BASE,
            HTTP_METHODS.GET
        );

        expect(response.status).toBe(200);
        const { response: data } = await response.json();
        testDocumentId = data.documentId;

        expect(data).toEqual({
            documentId: expect.stringMatching(GLOBAL_CONSTANTS.UUID_REGEX),
            content: DOCUMENTATION_TEST_DATA.INITIAL_CONTENT,
            createdAt: expect.any(String),
            updatedAt: expect.toBeOneOf([expect.any(String), null])
        });
    });

    it('should update documentation (201)', async () => {
        const response = await makeRequest(
            ENDPOINTS.DOCUMENTATION.BASE,
            HTTP_METHODS.POST,
            {
                content: DOCUMENTATION_TEST_DATA.UPDATED_CONTENT
            }
        );

        expect(response.status).toBe(201);
        expect(await response.json()).toEqual({
            response: "Documentation created successfully" // Same message for updates
        });
    });

    it('should verify documentation updates modify timestamps', async () => {
        const initialGet = await makeRequest(ENDPOINTS.DOCUMENTATION.BASE, HTTP_METHODS.GET);
        const initialData = await initialGet.json();

        await makeRequest(
            ENDPOINTS.DOCUMENTATION.BASE,
            HTTP_METHODS.POST,
            { content: "explicit-update-" + Date.now() } // Force new content
        );

        const updatedGet = await makeRequest(ENDPOINTS.DOCUMENTATION.BASE, HTTP_METHODS.GET);
        const updatedData = await updatedGet.json();

        const initialTime = new Date(initialData.response.updatedAt).getTime();
        const updatedTime = new Date(updatedData.response.updatedAt).getTime();

        expect(updatedTime).toBeGreaterThan(initialTime); // Strictly newer
    });
});