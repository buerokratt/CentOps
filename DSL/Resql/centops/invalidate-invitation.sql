INSERT INTO participants_invitations (contact_email, invitation_id, institution_id, valid)
VALUES (:contact_email, :invitation_id::UUID, :institution_id, FALSE);
