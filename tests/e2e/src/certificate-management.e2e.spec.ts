import { describe, expect, it } from 'vitest';
import { ENDPOINTS, GLOBAL_CONSTANTS, HTTP_METHODS } from './config';
import { makeRequest } from './helpers/request.helper';

describe('Certificate Management E2E', () => {
    const testClientId = '2142aa11-d31c-4cb1-9ca1-9260fd8c7349'; // From your example
    let testCertificateId: string;

    it('should generate new certificate (200)', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.CERTIFICATES.GENERATE}?clientId=${testClientId}`,
            HTTP_METHODS.GET
        );

        expect(response.status).toBe(200);
        const data = await response.json();
        testCertificateId = data.certificateId; // Store for subsequent tests

        expect(data).toEqual({
            certificateId: expect.stringMatching(GLOBAL_CONSTANTS.UUID_REGEX)
        });
    });

    it('should download generated certificate (200)', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.CERTIFICATES.DOWNLOAD}?clientId=${testClientId}&certificateId=${testCertificateId}`,
            HTTP_METHODS.GET
        );

        expect(response.status).toBe(200);
        expect(await response.json()).toEqual({
            response: {
                publicKey: expect.stringContaining('BEGIN PUBLIC KEY')
            }
        });
    });

    it('should delete certificate (204)', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.CERTIFICATES.BASE}?clientId=${testClientId}&certificateId=${testCertificateId}`,
            HTTP_METHODS.DELETE
        );

        expect(response.status).toBe(204);
        expect(await response.text()).toBe('');
    });
});