INSERT INTO clients (client_id, deleted)
SELECT client_id, TRUE
FROM clients
WHERE client_id = :client_id::uuid
  AND id = (SELECT max (id) FROM clients WHERE client_id = :client_id::uuid);