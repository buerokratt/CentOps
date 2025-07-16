WITH origin AS (
    UPDATE manifests
        SET deleted = true
        WHERE client_id = :client_id::uuid AND manifest_id = CAST(:manifest_id AS BIGINT)
        RETURNING created_at
),
     inserted AS (
         INSERT INTO manifests (client_id, name, helm_version, helm_values, created_at, updated_at)
             SELECT
                 :client_id,
                 :name,
                 :helm_version,
                 :helm_values,
                 origin.created_at,
                 NOW()
             FROM origin
             RETURNING manifest_id
     )
SELECT manifest_id FROM inserted;