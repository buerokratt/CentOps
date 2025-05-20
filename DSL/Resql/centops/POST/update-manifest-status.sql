UPDATE manifests
SET updated_at = now(),
    status = :status::manifest_status
WHERE manifest_id = :manifest_id::uuid
RETURNING manifest_id,
          buerokratt_version,
          components #>> '{}' as components,
          extra_configs #>> '{}' as extra_configs,
          security_configs #>> '{}' as security_configs;
