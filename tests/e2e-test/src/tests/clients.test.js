import {describe, expect, it} from 'vitest';
import got from 'got';
import 'dotenv/config';
import {headers} from "../setup/test-config";
import {getPgClient} from "../setup/pgPool";

let pgClient;

beforeAll(async () => {
    pgClient = await getPgClient();
});

afterAll(async () => {
   await pgClient.query(`DELETE FROM clients`);
});

//should_create_client_successful
describe('POST /centops/admin/clients', () => {
    it('should create a client successfully', async () => {

        const url = `http://localhost:9050/centops/admin/clients`;
        const payload = {
            name: 'test',
            kubernetesClusterAddress: 'middle',
            kubernetesClusterNamespace: 'demo',
            argoAppDeploymentName: 'spring-boot-app',
            authenticationCertificate: 'test'
        };

        try {
            const response = await got.post(url, {
                json: payload,
                headers: headers,
                responseType: 'json'
            });

            expect(response.statusCode).toBe(201);

            const result = await pgClient.query(`SELECT * FROM clients WHERE name = 'test'`);
            expect(result.rows).length(1);

            let row  = result.rows[0];
            expect(row.name).toBe(payload.name);
            expect(row.kubernetes_cluster_address).toBe(payload.kubernetesClusterAddress);
            expect(row.kubernetes_cluster_namespace).toBe(payload.kubernetesClusterNamespace);
            expect(row.authentication_certificate).toBe(payload.authenticationCertificate);
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