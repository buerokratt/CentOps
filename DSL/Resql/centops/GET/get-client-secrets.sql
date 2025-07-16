SELECT id,
       name,
       environment,
       created_at,
       updated_at,
       CEIL(COUNT(*) OVER() / :page_size::DECIMAL) AS total_pages
FROM secrets
WHERE client_id = :client_id::uuid
AND id IN (SELECT max(id) from secrets GROUP BY name)
AND deleted = FALSE
ORDER BY id
OFFSET ((GREATEST(:page::INTEGER, 1) - 1) * :page_size::INTEGER ) LIMIT :page_size::INTEGER;