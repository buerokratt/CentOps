INSERT INTO participants(institution_id, info)
VALUES (:institution_id, (:info)::jsonb)
RETURNING id, unique_identifier;
