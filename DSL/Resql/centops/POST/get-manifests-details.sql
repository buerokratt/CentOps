SELECT manifest_id,
       name,
       client_id,
       helm_version,
       helm_values,
       created_at,
       updated_at
FROM manifests
WHERE client_id = :client_id AND manifest_id = :manifest_id::uuid