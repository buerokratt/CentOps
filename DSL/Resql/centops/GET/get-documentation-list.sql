SELECT document_id,
       content,
       created_at,
       updated_at,
       CEIL(COUNT(*) OVER() / :page_size::DECIMAL) AS total_pages
FROM documentations d
WHERE d.id = (SELECT max(id) FROM documentations WHERE document_id = d.document_id)
  AND d.deleted = false
ORDER BY id
OFFSET ((GREATEST(:page::INTEGER, 1) - 1) * :page_size::INTEGER ) LIMIT :page_size::INTEGER;