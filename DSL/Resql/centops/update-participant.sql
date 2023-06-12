UPDATE participants
SET contact_email = :contact_email,
    name = :name,
WHERE id = :id;
