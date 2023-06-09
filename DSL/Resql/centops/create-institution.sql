INSERT INTO institutions (name, invitation_id, user_email)
VALUES (:name, :invitation_id::UUID, :user_email);
