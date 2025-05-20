INSERT INTO manifests_history (parent_manifest_id, buerokratt_version, components, extra_configs, security_configs, type, status)
VALUES (:parent_manifest_id::uuid, :buerokratt_version, :components::jsonb, :extra_configs::jsonb, :security_configs::jsonb, :type::manifest_history_type, :status::manifest_status);
