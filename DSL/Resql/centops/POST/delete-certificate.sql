INSERT INTO certificates (certificate_id, client_id, deleted)
VALUES (:certificate_id::uuid, :client_id::uuid, true);