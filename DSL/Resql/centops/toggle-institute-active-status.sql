WITH latest_status AS (
  SELECT institution_id, status
  FROM institution_status
  WHERE institution_id = :id::bigint
  ORDER BY id DESC
  LIMIT 1
)
INSERT INTO institution_status (institution_id, status)
VALUES(
  :id::bigint,
  (
    SELECT 
    CASE WHEN status = 'active' THEN 'inactive' ELSE 'active' END
    FROM latest_status
  )::status_type
);
