WITH origin AS (SELECT *
                FROM secrets
                WHERE id = CAST(:id AS BIGINT)
                  AND client_id = :client_id::uuid),
     inserted AS (
         INSERT INTO secrets (client_id, name, environment, created_at, updated_at)
             SELECT :client_id::uuid,
                    origin.name,
                    origin.environment,
                    origin.created_at,
                    NOW()
             FROM origin
             RETURNING id)
SELECT id
FROM inserted;