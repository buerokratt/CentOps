import {getPgClient} from "./pgPool";
import {log} from "testcontainers";

export async function getClientId() {
    const pgClient = await getPgClient();

    const result = await pgClient.query('SELECT * FROM clients LIMIT 1');

    let clientId;

    if (result.rows.length > 0) {
        clientId = result.rows[0].client_id;
        console.log('Client ID found:', clientId);
    } else {
        const insertResult = await pgClient.query(
            `
                INSERT INTO clients (name,
                                     kubernetes_cluster_address,
                                     kubernetes_cluster_namespace,
                                     argo_app_deployment_name,
                                     part_of_network)
                VALUES ('testClient',
                        'https://k8s.example.com:6443',
                        'default',
                        'testDeployment',
                        true)
                RETURNING client_id
            `
        );
        clientId = insertResult.rows[0].client_id;
        console.log('New Client ID added:', clientId);
    }

    log.info("Client ID is added globally: " + clientId);
    return clientId;
}