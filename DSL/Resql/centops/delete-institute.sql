UPDATE institutions
SET status = 'deleted'::status_type
WHERE id = :id::bigint;
