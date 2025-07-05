SELECT document_id,
       content,
       created_at,
       updated_at
FROM documentations
WHERE document_id = :document_id::uuid
  AND id = (SELECT max(id) FROM documentations WHERE document_id = :document_id::uuid)
  AND deleted = false;