UPDATE manifests_updates
SET buerokratt_version = :buerokratt_version,
    components = :components::jsonb,
    extra_configs = :extra_configs::jsonb,
    security_configs = :security_configs::jsonb,
    status = :status::manifest_status
WHERE update_id = :update_id::uuid
