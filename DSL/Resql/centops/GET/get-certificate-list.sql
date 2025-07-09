SELECT id,
       certificate_id,
       client_id,
       certificate_value,
       serial_number,
       created_at,
       valid_until,
       is_active,
       CEIL(COUNT(*) OVER() / :page_size::DECIMAL) AS total_pages
FROM certificates c
WHERE c.client_id = :client_id::uuid
  AND c.id = (SELECT max(id) FROM certificates WHERE certificate_id = c.certificate_id)
  AND c.deleted = false
ORDER BY id
OFFSET ((GREATEST(:page::INTEGER, 1) - 1) * :page_size::INTEGER ) LIMIT :page_size::INTEGER;