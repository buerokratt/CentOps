SELECT certificate_id,
       client_id,
       certificate_value,
       serial_number,
       created_at,
       valid_until,
       is_active
FROM certificates
WHERE certificate_id = :certificate_id::uuid
  AND client_id = :client_id::uuid
  AND id = (SELECT max(id) FROM certificates WHERE certificate_id = :certificate_id::uuid)
  AND deleted = false;