INSERT INTO manifests (client_id, name, helm_version, helm_values)
VALUES (:client_id, :name, :helm_version, :helm_values)
RETURNING manifest_id;