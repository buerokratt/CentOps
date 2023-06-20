UPDATE institutions
SET status = CASE 
    WHEN old.status = 'active' THEN 'inactive'::status_type
    ELSE 'active'::status_type
  END
  FROM (SELECT status FROM institutions WHERE id = :id::bigint) AS old
WHERE id = :id::bigint;
