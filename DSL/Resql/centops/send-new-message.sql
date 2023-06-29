WITH inserted_message AS (
  INSERT INTO messages (sender_id, receiver_id, message, type)
  VALUES (:sender_id, :receiver_id, :message, :type::messages_type)
  RETURNING id
)
INSERT INTO message_status (message_id)
SELECT id
FROM inserted_message;
