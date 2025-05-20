INSERT INTO message_status (message_id, status)
SELECT m.id, 'RECEIVED'
FROM messages AS m
WHERE CAST(m.receiver_id AS TEXT) = :user_id
AND NOT EXISTS (
  SELECT 1
  FROM message_status AS ms
  WHERE ms.message_id = m.id
  AND ms.status = 'RECEIVED'
);
