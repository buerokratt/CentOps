SELECT client_id,
       name,
       kubernetes_cluster_namespace,
       argo_app_deployment_name
FROM clients
WHERE client_id = :client_id::uuid
  AND id IN (SELECT max(id) from clients GROUP BY name)
  AND deleted = FALSE;