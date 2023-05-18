SELECT invitation_id 
FROM invitation
WHERE user_email=:user_email
AND valid = TRUE
AND id IN (SELECT max(id) from invitation);
