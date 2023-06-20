UPDATE institutions
SET 
  name = :name, 
  contact_email = :email
WHERE id = :id::bigint;
