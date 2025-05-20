INSERT into participants(unique_identifier, participant_status, participant_type, institution_id, security_token, info)
VALUES (:unique_identifier::uuid, :participant_status::status_type, :participant_type::participant_type, :institution_id, :security_token::uuid, :info);
