INSERT INTO secrets (name,
                     client_id,
                     environment,
                     deleted)
SELECT name,
       client_id,
       environment,
       TRUE
FROM secrets
WHERE id = CAST(:id AS BIGINT) AND client_id = CAST(:client_id AS BIGINT)