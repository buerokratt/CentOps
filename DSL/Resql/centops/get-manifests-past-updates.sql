SELECT parent_manifest_id,
       history_id,
       buerokratt_version,
       update_id,
       created_at,
       components #>> '{}' as components,
       extra_configs #>> '{}' as extra_configs,
       security_configs #>> '{}' as security_configs,
       type,
       status
FROM manifests_history
WHERE type = 'update';
