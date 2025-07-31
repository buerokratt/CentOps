import { describe, expect, it } from 'vitest';
import { CLUSTER_TEST_DATA, ENDPOINTS, GLOBAL_CONSTANTS, HTTP_METHODS } from './config';
import {makeRequest} from "./helpers/request.helper";

describe('Cluster Management E2E', () => {
    let testClusterId: string;
    const clusterName = `vitest-e2e-cluster-${Date.now()}`;

    it('should create cluster', async () => {
        const response = await makeRequest(
            ENDPOINTS.CLUSTERS.BASE,
            HTTP_METHODS.POST,
            {
                name: clusterName,
                ipAddress: CLUSTER_TEST_DATA.IP_ADDRESS
            }
        );

        expect(response.status).toBe(201);
        expect(await response.json()).toEqual({
            response: "Cluster created successfully"
        });
    });

    it('should list clusters and get first cluster ID', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.CLUSTERS.BASE}?page=${GLOBAL_CONSTANTS.PAGE}&pageSize=${GLOBAL_CONSTANTS.PAGE_SIZE}`,
            HTTP_METHODS.GET
        );

        expect(response.status).toBe(200);
        const { response: data } = await response.json();
        testClusterId = data.items[0].clusterId;

        expect(data).toEqual({
            items: expect.arrayContaining([
                expect.objectContaining({
                    clusterId: expect.stringMatching(GLOBAL_CONSTANTS.UUID_REGEX),
                    name: expect.any(String),
                    ipAddress: expect.any(String),
                    createdAt: expect.any(String)
                })
            ]),
            page: GLOBAL_CONSTANTS.PAGE,
            pageSize: GLOBAL_CONSTANTS.PAGE_SIZE,
            totalPages: expect.any(Number)
        });
    });

    it('should read cluster', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.CLUSTERS.BY_ID}?clusterId=${testClusterId}`,
            HTTP_METHODS.GET
        );

        expect(response.status).toBe(200);
        expect((await response.json()).response).toEqual({
            clusterId: expect.stringMatching(GLOBAL_CONSTANTS.UUID_REGEX),
            name: expect.any(String),
            ipAddress: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.toBeOneOf([expect.any(String), null])
        });
    });

    it('should update cluster', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.CLUSTERS.BASE}?clusterId=${testClusterId}`,
            HTTP_METHODS.PUT,
            {
                name: "updated-" + clusterName,
                ipAddress: CLUSTER_TEST_DATA.UPDATED_IP_ADDRESS
            }
        );

        expect(response.status).toBe(204);
        expect(await response.text()).toBe('');
    });

    it('should delete cluster', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.CLUSTERS.BASE}?clusterId=${testClusterId}`,
            HTTP_METHODS.DELETE
        );

        expect(response.status).toBe(204);
        expect(await response.text()).toBe('');
    });
});