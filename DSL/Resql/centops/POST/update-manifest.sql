UPDATE manifests
SET
    name = :name,
    helm_version = :helm_version,
    helm_values = :helm_values,
    updated_at = NOW()
WHERE client_id = :client_id AND manifest_id = :manifest_id::uuid
