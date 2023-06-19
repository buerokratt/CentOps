INSERT INTO manifests (buerokratt_version, components, extra_configs, security_configs)
VALUES (:buerokratt_version, :components::jsonb, :extra_configs::jsonb, :security_configs::jsonb);
