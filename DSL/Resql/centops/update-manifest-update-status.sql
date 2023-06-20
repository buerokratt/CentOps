UPDATE manifests_updates
SET status = :status::manifest_status
WHERE update_id = :update_id::uuid
