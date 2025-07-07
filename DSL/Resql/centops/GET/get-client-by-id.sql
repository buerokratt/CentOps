SELECT id,
       name,
       kubernetes_cluster_namespace,
       argo_app_deployment_name
FROM clients
WHERE id = CAST(:id AS BIGINT)
  AND id IN (SELECT max(id) from clients GROUP BY name)
  AND deleted = FALSE;