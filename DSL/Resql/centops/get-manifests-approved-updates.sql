SELECT parent_manifest_id,
       buerokratt_version,
       update_id,
       created_at,
       updated_at,
       components #>> '{}' as components,
       extra_configs #>> '{}' as extra_configs,
       security_configs #>> '{}' as security_configs,
       status
FROM manifests_updates
WHERE status = 'approved';
