DELETE FROM manifests
WHERE manifest_id = :manifest_id::uuid;
