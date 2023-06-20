SELECT COUNT(*) FROM manifests_updates
WHERE parent_manifest_id = :parent_manifest_id::uuid;
