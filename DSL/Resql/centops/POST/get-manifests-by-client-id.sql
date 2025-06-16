SELECT manifest_id,
       name,
       helm_version,
       created_at,
       updated_at
FROM manifests
WHERE client_id = :client_id AND deleted = false
