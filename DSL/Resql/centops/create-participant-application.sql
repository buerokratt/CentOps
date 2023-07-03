INSERT INTO participants(name, institution_id, contact_email, name_abbreviated, ip_address, host, info)
VALUES (:name, :institution_id, :contact_email, :name_abbreviated, :ip_address::CIDR, :host, :info)
RETURNING id, unique_identifier;
