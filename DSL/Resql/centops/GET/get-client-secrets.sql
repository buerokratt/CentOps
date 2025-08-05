SELECT id,
       name,
       environment,
       created_at,
       updated_at,
       CEIL(COUNT(*) OVER() / :page_size::DECIMAL) AS total_pages
FROM secrets s
WHERE s.client_id = :client_id::uuid
AND s.id IN (SELECT max(id) from secrets WHERE id = s.id)
AND deleted = FALSE
ORDER BY name
OFFSET ((GREATEST(:page::INTEGER, 1) - 1) * :page_size::INTEGER ) LIMIT :page_size::INTEGER;