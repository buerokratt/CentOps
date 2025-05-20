SELECT invitation_id 
FROM participants_invitations
WHERE contact_email=:contact_email
AND valid = TRUE
AND id IN (SELECT max(id) from participants_invitations);
