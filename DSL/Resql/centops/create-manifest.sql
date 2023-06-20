INSERT INTO manifests (buerokratt_version, components, extra_configs, security_configs)
VALUES (:buerokratt_version, :components::jsonb, :extra_configs::jsonb, :security_configs::jsonb)
RETURNING manifest_id,
          buerokratt_version,
          components #>> '{}' as components,
          extra_configs #>> '{}' as extra_configs,
          security_configs #>> '{}' as security_configs;
