INSERT INTO manifests_updates (parent_manifest_id, buerokratt_version, components, extra_configs, security_configs)
VALUES (:parent_manifest_id::uuid, :buerokratt_version, :components::jsonb, :extra_configs::jsonb, :security_configs::jsonb)
RETURNING update_id;
