SELECT invitation_id 
FROM institutions_invitations
WHERE user_email=:user_email
AND valid = TRUE
AND id IN (SELECT max(id) from invitation);
