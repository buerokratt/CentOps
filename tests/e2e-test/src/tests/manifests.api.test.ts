import {beforeAll, afterAll, describe, expect, it} from 'vitest';
import {makeRequest} from './helpers/request.helper';
import {ENDPOINTS, GLOBAL_CONSTANTS, HTTP_METHODS} from '../setup/config';
import {getClientId} from "../setup/dbHelper";
import {getPgClient} from "../setup/pgPool";

let pgClient;

beforeAll(async () => {
    pgClient = await getPgClient();
});

afterAll(async () => {
    await pgClient.query(`DELETE FROM manifests`);
});

describe('Manifest Management E2E', () => {
    let testClientId: string;
    let testManifestId: string;

    it('should get clientId globally', async () => {
        testClientId = await getClientId();
        expect(testClientId).toMatch(GLOBAL_CONSTANTS.UUID_REGEX);
    });

    it('should create a manifest', async () => {
        const response = await makeRequest(
            ENDPOINTS.MANIFESTS.CREATE,
            HTTP_METHODS.POST,
            {
                clientId: testClientId,
                name: "3111",
                gitHelmBranch: "master",
                helmValues: "image:\n  repository: spring-boot-argo\n  tag: master\nenvs:\n  - name: VAULT_SECRET_USER\n",
                gitHelmRepository: "https://github.com/test",
                gitHelmPath: "infra/helm"
            }
        );

        expect(response.status).toBe(201);
        expect(await response.json()).toEqual({
            response: 'Manifest created successfully'
        });
    });

    it('should get manifest by clientId from db', async () => {
        const manifest = await pgClient.query(`SELECT manifest_id
                                               FROM manifests
                                               WHERE client_id = '${testClientId}'`);
        testManifestId = manifest.rows[0].manifest_id;
    });

    it('should get the created manifest', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.MANIFESTS.GET_BY_ID}?clientId=${testClientId}&manifestId=${testManifestId}`,
            HTTP_METHODS.GET
        );

        expect(response.status).toBe(200);
        const {response: data} = await response.json();
        console.log('data:', data);

        expect(data).toEqual(
            expect.objectContaining({
                manifestId: expect.any(String),
                name: '3111',
                clientId: 'cc04de2d-69c8-485b-9ef6-5273d577ca64',
                gitHelmBranch: 'master',
                helmValues: 'image:\n' +
                    '  repository: spring-boot-argo\n' +
                    '  tag: master\n' +
                    'envs:\n' +
                    '  - name: VAULT_SECRET_USER\n',
                createdAt: expect.any(String),
                updatedAt: null,
                gitHelmRepository: 'https://github.com/test',
                gitHelmPath: 'infra/helm'
            })
        );
    });

    it('should duplicate the manifest', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.MANIFESTS.DUPLICATE}?manifestId=${testManifestId}&clientId=${testClientId}`,
            HTTP_METHODS.POST,
            {}
        );

        expect(response.status).toBe(201);
        expect(await response.json()).toEqual({
            response: 'Manifest created successfully'
        });
    });

    it('should update the manifest', async () => {
        const response = await makeRequest(
            ENDPOINTS.MANIFESTS.UPDATE,
            HTTP_METHODS.PUT,
            {
                clientId: testClientId,
                name: 'new name',
                manifestId: testManifestId,
                gitHelmBranch: "master",
                helmValues: "image:\n  repository: spring-boot-argo\n  tag: master\nenvs:\n  - name: VAULT_SECRET_USER\n",
                gitHelmRepository: "https://github.com/test",
                gitHelmPath: "infra/helm"
            }
        );

        expect(response.status).toBe(200);
        expect(await response.json()).toEqual({
            response: 'Manifest updated successfully'
        });
    });


    it('should get all manifests by client ID', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.MANIFESTS.GET_ALL_BY_CLIENT_ID}?clientId=${testClientId}`,
            HTTP_METHODS.GET
        );

        expect(response.status).toBe(200);
        const {response: manifests} = await response.json();

        expect(Array.isArray(manifests.items)).toBe(true);
        expect(manifests.items.length).eq(2); //with duplicate
    });

    it('should delete the manifest', async () => {
        const response = await makeRequest(
            `${ENDPOINTS.MANIFESTS.DELETE}?clientId=${testClientId}&manifestId=${testManifestId}`,
            HTTP_METHODS.DELETE
        );

        expect(response.status).toBe(204);
        expect(await response.text()).toBe('');
    });
});
