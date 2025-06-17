SELECT id,
       name,
       kubernetes_cluster_address,
       kubernetes_cluster_namespace,
       authentication_certificate,
       created
FROM clients
WHERE id IN (SELECT max(id) from clients GROUP BY name)
AND deleted = FALSE
ORDER BY created DESC;