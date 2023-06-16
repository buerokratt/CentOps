SELECT DISTINCT ON (unique_identifier) * 
FROM participants
WHERE participant_status != 'unprocessed'::status_type
AND id IN (SELECT max(id) from participants GROUP BY unique_identifier);
