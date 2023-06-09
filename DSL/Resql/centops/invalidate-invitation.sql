INSERT INTO institutions_invitations (user_email, invitation_id, valid)
VALUES (:user_email, :invitation_id::UUID, FALSE);
