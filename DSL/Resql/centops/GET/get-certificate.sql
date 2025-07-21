SELECT public_key
FROM certificates
WHERE client_id = :client_id::uuid
  AND id = (SELECT max(id) FROM certificates WHERE certificate_id = :certificate_id::uuid)
  AND deleted = false;