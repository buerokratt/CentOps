import { describe, expect, it } from 'vitest';
import { CLIENT_TEST_DATA, ENDPOINTS, GLOBAL_CONSTANTS, HTTP_METHODS } from '../setup/config';
import { makeRequest } from './helpers/request.helper';

describe('Certificate Management E2E', () => {
    let testClientId: string;
    let testCertificateId: string;
    const clientName = `test-client-${Date.now()}`;

    it('should create client', async () => {
        const response = await makeRequest(
            ENDPOINTS.CLIENTS.BASE,
            HTTP_METHODS.POST,
            {
                name: clientName,
                kubernetesClusterId: CLIENT_TEST_DATA.CLUSTER_ID,
                kubernetesClusterNamespace: CLIENT_TEST_DATA.CLUSTER_NAMESPACE,
                argoAppDeploymentName: CLIENT_TEST_DATA.ARGO_DEPLOYMENT_NAME,
                partOfNetwork: CLIENT_TEST_DATA.PART_OF_NETWORK
            }
        );

        expect(response.status).toBe(201);
        expect(await response.json()).toEqual({
            response: "Client created successfully"
        });
    });

    it('should get first client ID from list', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.CLIENTS.BASE}?page=${GLOBAL_CONSTANTS.PAGE}&pageSize=${GLOBAL_CONSTANTS.PAGE_SIZE}`,
            HTTP_METHODS.GET
        );

        expect(response.status).toBe(200);
        const { response: data } = await response.json();
        testClientId = data.items[0]?.clientId;

        expect(testClientId).toMatch(GLOBAL_CONSTANTS.UUID_REGEX);
    });

    it('should generate new certificate (200)', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.CERTIFICATES.GENERATE}?clientId=${testClientId}`,
            HTTP_METHODS.POST
        );

        expect(response.status).toBe(200);
        const data = await response.json();
        testCertificateId = data.certificateId;

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