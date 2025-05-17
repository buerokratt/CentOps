WITH latest_status AS (
  SELECT DISTINCT ON (institution_id) id, institution_id, status
  FROM institution_status
  ORDER BY institution_id, id DESC
),
latest_info AS (
  SELECT DISTINCT ON (institution_id) id, institution_id, name, contact_email
  FROM institution_info
  ORDER BY institution_id, id DESC
)
SELECT 
  i.id,
  b.name, 
  b.contact_email, 
  i.timestamp,
  a.status
FROM institutions i
INNER JOIN latest_status a ON i.id = a.institution_id
INNER JOIN latest_info b ON i.id = b.institution_id
WHERE status != 'deleted'
ORDER BY i.id;
