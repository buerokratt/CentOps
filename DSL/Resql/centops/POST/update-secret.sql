WITH origin AS (SELECT *
                FROM secrets
                WHERE id = CAST(:id AS BIGINT)
                  AND client_id = CAST(:client_id AS BIGINT)),
     inserted AS (
         INSERT INTO secrets (client_id, name, environment, created_at, updated_at)
             SELECT :client_id,
                    origin.name,
                    origin.environment,
                    origin.created_at,
                    NOW()
             FROM origin
             RETURNING id)
SELECT id
FROM inserted;