INSERT INTO institution_status (institution_id, status)
VALUES(:id::bigint, 'deleted'::status_type);
