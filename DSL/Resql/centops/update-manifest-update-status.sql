UPDATE manifests_updates
SET updated_at = now(),
    status = :status::manifest_status
WHERE update_id = :update_id::uuid
RETURNING parent_manifest_id,
          buerokratt_version,
          components #>> '{}' as components,
          extra_configs #>> '{}' as extra_configs,
          security_configs #>> '{}' as security_configs;
