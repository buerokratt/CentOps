SELECT id,
       name,
       kubernetes_cluster_address,
       kubernetes_cluster_namespace,
       authentication_certificate,
       created,
       CEIL(COUNT(*) OVER() / :page_size::DECIMAL) AS total_pages
FROM clients
WHERE id IN (SELECT max(id) from clients GROUP BY name)
  AND deleted = FALSE
ORDER BY id
OFFSET ((GREATEST(:page::INTEGER, 1) - 1) * :page_size::INTEGER ) LIMIT :page_size::INTEGER;