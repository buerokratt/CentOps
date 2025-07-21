SELECT id,
       name,
       environment,
       created_at,
       updated_at
FROM secrets
WHERE id = CAST(:id AS BIGINT)
  AND client_id = :client_id::uuid
  AND id IN (SELECT max(id) from secrets GROUP BY name)
  AND deleted = FALSE;