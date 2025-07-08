INSERT INTO deployments (client_id, manifest_id, manifest_version, status, deployed_by_id_code,
                         deployed_by_username, deployed_by_lastname, argo_deploy_app_name, argo_deployment_id)
VALUES (CAST(:client_id AS BIGINT), :manifest_id, :manifest_version, :status, :deployed_by_id_code,
        :deployed_by_username, :deployed_by_lastname, :argo_deploy_app_name,CAST(:argo_deployment_id AS UUID))
RETURNING id, status;