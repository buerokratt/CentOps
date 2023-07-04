SELECT manifest_id,
       buerokratt_version,
       created_at,
       updated_at,
       components #>> '{}' as components,
       extra_configs #>> '{}' as extra_configs,
       security_configs #>> '{}' as security_configs,
       status
FROM manifests
WHERE status = 'approved' OR status = 'has_updates';
