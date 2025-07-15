SELECT id,
       name,
       environment,
       created_at,
       updated_at
FROM secrets
WHERE id = CAST(:id AS BIGINT)
  AND client_id = CAST(:client_id AS BIGINT)
  AND id IN (SELECT max(id) from secrets GROUP BY name)
  AND deleted = FALSE;