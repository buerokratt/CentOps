UPDATE manifests_updates
SET parent_manifest_id = :parent_manifest_id::uuid,
    buerokratt_version = :buerokratt_version,
    components = :components::jsonb,
    extra_configs = :extra_configs::jsonb,
    security_configs = :security_configs::jsonb
WHERE update_id = :update_id::uuid
