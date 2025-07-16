SELECT manifest_id,
       client_id,
       name,
       helm_version,
       created_at,
       updated_at
FROM manifests
WHERE client_id = :client_id::uuid
  AND manifest_id IN (SELECT max(manifest_id) from manifests GROUP BY helm_version)
  AND deleted = FALSE
ORDER BY created_at DESC;
