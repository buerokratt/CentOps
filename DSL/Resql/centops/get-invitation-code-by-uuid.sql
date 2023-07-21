SELECT invitation_id, contact_email, institution_id
FROM participants_invitations
WHERE invitation_id::text = :invitation_id
AND valid = TRUE
AND id IN (SELECT max(id) from participants_invitations);
