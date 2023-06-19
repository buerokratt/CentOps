UPDATE manifests
SET updated_at = now(),
    status = :status::manifest_status
WHERE manifest_id = :manifest_id::uuid
