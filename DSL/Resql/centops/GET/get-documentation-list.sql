SELECT document_id,
       content,
       created_at,
       updated_at
FROM documentations d
WHERE d.id = (SELECT max(id) FROM documentations WHERE document_id = d.document_id)
  AND d.deleted = false;