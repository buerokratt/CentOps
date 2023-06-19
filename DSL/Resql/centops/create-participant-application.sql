INSERT INTO participants(name, institution_id, contact_email, info)
VALUES (:name, :institution_id, :contact_email, :info)
RETURNING id, unique_identifier;
