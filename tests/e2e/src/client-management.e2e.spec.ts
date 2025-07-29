import {describe, expect, it} from 'vitest';
import {CLIENT_TEST_DATA, ENDPOINTS, GLOBAL_CONSTANTS, HTTP_METHODS} from './config';
import {makeRequest} from "./helpers/request.helper";

describe('Client Management E2E', () => {
    let testClientId: string;
    let clientName = `vitest-e2e-client-${Date.now()}`;

    it('should create client', async () => {
        const response = await makeRequest(
            ENDPOINTS.CLIENTS.BASE,
            HTTP_METHODS.POST,
            {
                name: clientName,
                kubernetesClusterAddress: CLIENT_TEST_DATA.CLUSTER_ADDRESS,
                kubernetesClusterNamespace: CLIENT_TEST_DATA.CLUSTER_NAMESPACE,
                argoAppDeploymentName: CLIENT_TEST_DATA.ARGO_DEPLOYMENT_NAME,
                authenticationCertificate: CLIENT_TEST_DATA.CERTIFICATE
            }
        );

        expect(response.status).toBe(201);
        expect(await response.json()).toEqual({
            response: "Client created successfully"
        });
    });

    it('should list clients and get first client ID', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.CLIENTS.BASE}?page=${GLOBAL_CONSTANTS.PAGE}&pageSize=${GLOBAL_CONSTANTS.PAGE_SIZE}`,
            HTTP_METHODS.GET
        );

        expect(response.status).toBe(200);
        const { response: data } = await response.json();
        testClientId = data.items[0].clientId;

        expect(data).toEqual({
            items: expect.arrayContaining([
                expect.objectContaining({
                    clientId: expect.stringMatching(GLOBAL_CONSTANTS.UUID_REGEX),
                    name: expect.any(String),
                    kubernetesClusterAddress: expect.any(String),
                    kubernetesClusterNamespace: expect.any(String),
                    authenticationCertificate: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.toBeOneOf([expect.any(String), null])
                })
            ]),
            page: GLOBAL_CONSTANTS.PAGE,
            pageSize: GLOBAL_CONSTANTS.PAGE_SIZE,
            totalPages: expect.any(Number)
        });
    });

    it('should list clients with minimal data', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.CLIENTS.MINIMAL}?page=${GLOBAL_CONSTANTS.PAGE}&pageSize=${GLOBAL_CONSTANTS.PAGE_SIZE}`,
            HTTP_METHODS.GET
        );

        expect(response.status).toBe(200);
        const { response: data } = await response.json();

        expect(data).toEqual({
            items: expect.arrayContaining([
                expect.objectContaining({
                    clientId: expect.stringMatching(GLOBAL_CONSTANTS.UUID_REGEX),
                    name: expect.any(String),
                    authenticationCertificate: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.toBeOneOf([expect.any(String), null])
                })
            ]),
            page: GLOBAL_CONSTANTS.PAGE,
            pageSize: GLOBAL_CONSTANTS.PAGE_SIZE,
            totalPages: expect.any(Number)
        });
    });

    it('should read client', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.CLIENTS.BY_ID}?clientId=${testClientId}`,
            HTTP_METHODS.GET
        );

        expect(response.status).toBe(200);
        expect((await response.json()).response).toEqual({
            clientId: expect.stringMatching(GLOBAL_CONSTANTS.UUID_REGEX),
            name: expect.any(String),
            kubernetesClusterAddress: expect.any(String),
            kubernetesClusterNamespace: expect.any(String),
            argoAppDeploymentName: expect.any(String),
            authenticationCertificate: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.toBeOneOf([expect.any(String), null])
        });
    });

    it('should update client', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.CLIENTS.BASE}?clientId=${testClientId}`,
            HTTP_METHODS.PUT,
            {
                name: "updated-" + clientName,
                kubernetesClusterAddress: "https://k8s.example.com:6444",
                kubernetesClusterNamespace: CLIENT_TEST_DATA.CLUSTER_NAMESPACE,
                argoAppDeploymentName: "s.1234567890abcdef",
                authenticationCertificate: CLIENT_TEST_DATA.CERTIFICATE
            }
        );

        expect(response.status).toBe(204);
        expect(await response.text()).toBe('');
    });

    it('should delete client', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.CLIENTS.BASE}?clientId=${testClientId}`,
            HTTP_METHODS.DELETE
        );

        expect(response.status).toBe(204);
        expect(await response.text()).toBe('');
    });
});