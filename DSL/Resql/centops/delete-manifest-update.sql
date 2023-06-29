UPDATE manifests_updates
SET status = 'deleted'
WHERE update_id = :update_id::uuid
RETURNING parent_manifest_id,
          buerokratt_version,
          components #>> '{}' as components,
          extra_configs #>> '{}' as extra_configs,
          security_configs #>> '{}' as security_configs;
