INSERT INTO participants(name, institution_id, info)
VALUES (:name, :institution_id, :info)
RETURNING id, unique_identifier;
