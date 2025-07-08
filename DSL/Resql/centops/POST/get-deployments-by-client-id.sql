SELECT id,
       client_id,
       manifest_version,
       deployed_by_id_code,
       argo_deploy_app_name,
       concat(deployed_by_username, ' ', deployed_by_lastname) as deployed_by,
       status,
       created_at
FROM deployments
WHERE client_id = CAST(:client_id AS BIGINT)
ORDER BY created_at DESC;
