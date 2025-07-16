INSERT INTO certificates (certificate_id, client_id, deleted)
SELECT :certificate_id::uuid, :client_id::uuid, true WHERE EXISTS (
    SELECT 1 FROM certificates
    WHERE certificate_id = :certificate_id::uuid
    AND client_id = :client_id::uuid
);