INSERT INTO secrets (client_id, name, environment)
VALUES (:client_id, :name, :environment)
RETURNING id;