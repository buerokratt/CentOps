INSERT INTO participants(name, institution_id, contact_email, name_abbreviated, ip_address, host)
VALUES (:name, :institution_id, :contact_email, :name_abbreviated, :ip_address::CIDR, :host)
RETURNING id, unique_identifier;
