import { getPgClient } from "./pgPool";
import { log } from "testcontainers";

let globalClientId: string | null = null;


export async function getClientId() {
    if (globalClientId) {
        log.info('Reusing existing Client ID:' + globalClientId);
        return globalClientId;
    }

    const pgClient = await getPgClient();

    const result = await pgClient.query('SELECT * FROM clients LIMIT 1');

    if (result.rows.length > 0) {
        globalClientId = result.rows[0].client_id;
        console.log('Client ID found:', globalClientId);
    } else {
        const insertResult = await pgClient.query(
            `
                INSERT INTO clients (name,
                                     kubernetes_cluster_id,
                                     kubernetes_cluster_namespace,
                                     argo_app_deployment_name,
                                     part_of_network)
                VALUES ('testClient_global',
                        uuid_generate_v4(),
                        'default',
                        'testDeployment',
                        true)
                RETURNING client_id
            `
        );
        globalClientId = insertResult.rows[0].client_id;
        console.log('New Client ID added:', globalClientId);
    }
    log.info("Client ID is added globally: " + globalClientId);

    return globalClientId;
}
