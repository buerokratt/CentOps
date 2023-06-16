INSERT INTO participants(name, institution_id, contact_email)
VALUES (:name, :institution_id, :contact_email)
RETURNING id, unique_identifier;
