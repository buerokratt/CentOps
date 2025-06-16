UPDATE manifests
SET deleted = true
WHERE client_id = :client_id AND manifest_id = :manifest_id::uuid
