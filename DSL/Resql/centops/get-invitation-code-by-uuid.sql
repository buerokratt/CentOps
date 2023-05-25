SELECT invitation_id 
FROM institutions_invitations
WHERE invitation_id::text = :invitation_id
AND valid = TRUE
AND id IN (SELECT max(id) from institutions_invitations);
