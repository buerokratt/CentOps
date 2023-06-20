UPDATE manifests
SET buerokratt_version = :buerokratt_version,
    components = :components::jsonb,
    extra_configs = :extra_configs::jsonb,
    security_configs = :security_configs::jsonb,
    updated_at = now(),
    status = :status::manifest_status
WHERE manifest_id = :manifest_id::uuid
