INSERT INTO secrets (client_id, name, environment)
VALUES (:client_id::uuid, :name, :environment)
RETURNING id;