SELECT * FROM participants
WHERE unique_identifier = :unique_identifier::uuid
AND id IN (SELECT max(id) from participants GROUP BY unique_identifier);
