INSERT INTO certificates (client_id, public_key)
VALUES (:client_id::uuid, :public_key)
RETURNING certificate_id;