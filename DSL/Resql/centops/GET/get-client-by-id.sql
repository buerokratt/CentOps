SELECT id,
       kubernetes_cluster_namespace
FROM clients
WHERE id = CAST(:id AS BIGINT)
AND id IN (SELECT max(id) from clients GROUP BY name)
AND deleted = FALSE;