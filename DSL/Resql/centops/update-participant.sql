INSERT into participants(contact_email, name, host, unique_identifier, participant_status, participant_type, institution_id)
VALUES (:contact_email, :name, :host, :unique_identifier::uuid, :participant_status::status_type, :participant_type::participant_type, :institution_id);
