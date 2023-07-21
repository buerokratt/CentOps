INSERT INTO message_status (message_id, status)
SELECT m.id, 'RECEIVED'
FROM messages AS m
WHERE m.receiver_id = :user_id
AND NOT EXISTS (
  SELECT 1
  FROM message_status AS ms
  WHERE ms.message_id = m.id
  AND ms.status = 'RECEIVED'
);
