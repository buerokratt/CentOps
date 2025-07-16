SELECT id,
       name,
       environment,
       created_at,
       updated_at
FROM secrets
WHERE client_id = :client_id::uuid
AND id IN (SELECT max(id) from secrets GROUP BY name)
AND deleted = FALSE;