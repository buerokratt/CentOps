INSERT INTO messages (sender_id, receiver_id, message, type, reply_to_message_id)
VALUES (:sender_id, :receiver_id, :message, :type, :reply_to_message_id);
