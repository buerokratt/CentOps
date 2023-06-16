SELECT * FROM participants
WHERE ip_address = :ip_address::CIDR
AND 
AND id IN (SELECT max(id) from participants GROUP BY unique_identifier);
