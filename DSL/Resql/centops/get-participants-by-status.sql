SELECT * FROM participants
WHERE participant_status = :participant_status::status_type;
