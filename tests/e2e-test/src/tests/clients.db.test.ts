import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import 'dotenv/config';
import { getPgClient } from "../setup/pgPool";
import { makeRequest } from "./helpers/request.helper";
import { ENDPOINTS, HTTP_METHODS } from "../setup/config";

let pgClient;
let clientName = 'test222';

beforeAll(async () => {
    pgClient = await getPgClient();
});

afterAll(async () => {
    await pgClient.query(`DELETE FROM clients WHERE name = $1`, [clientName]);
});

//should_create_client_successful
describe('POST /centops/admin/clients', () => {
    it('should create a client successfully', async () => {

        const payload = {
            name: `${clientName}`,
            kubernetesClusterId: '75c24660-3df8-4ca5-a9a8-2145cf19ba1d',
            kubernetesClusterNamespace: 'demo',
            argoAppDeploymentName: 'spring-boot-app',
            partOfNetwork: true
        };

        try {
            const response = await makeRequest(
                ENDPOINTS.CLIENTS.BASE,
                HTTP_METHODS.POST,
                payload
            );

            expect(response.status).toBe(201);

            // Use parameterized query for SELECT
            const result = await pgClient.query(`SELECT * FROM clients WHERE name = $1`, [clientName]);
            expect(result.rows).toHaveLength(1);

            let row = result.rows[0];
            expect(row.name).toBe(payload.name);
            expect(row.kubernetes_cluster_id).toBe(payload.kubernetesClusterId);
            expect(row.kubernetes_cluster_namespace).toBe(payload.kubernetesClusterNamespace);
            expect(row.argo_app_deployment_name).toBe(payload.argoAppDeploymentName);
            expect(row.deleted).toBe(false);
            expect(row.created_at).not.toBeNull();
            expect(row.client_id).not.toBeNull();
            expect(row.updated_at).toBeNull();

        } catch (error) {
            console.error('Error:', error.response?.body || error.message);
            throw error;
        }
    });
});
