INSERT INTO manifests (name,
                       client_id,
                       helm_version,
                       helm_values,
                       deleted,
                       created_at)
SELECT name,
       client_id,
       helm_version,
       helm_values,
       TRUE,
       NOW()
FROM manifests
WHERE manifest_id = CAST(:manifest_id AS BIGINT) AND client_id = :client_id

