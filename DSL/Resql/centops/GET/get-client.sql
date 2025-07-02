SELECT id,
       name,
       kubernetes_cluster_address,
       kubernetes_cluster_namespace,
       argo_app_deployment_name,
       authentication_certificate,
       created
FROM clients
WHERE name = :name
AND id IN (SELECT max(id) from clients GROUP BY name)
AND deleted = FALSE;