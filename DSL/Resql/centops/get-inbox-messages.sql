SELECT 
    m.id, 
    m.message, 
    m.type, 
    m.timestamp,
    m.reply_to_message_id,
    m.sender_id, 
    m.receiver_id, 
    ms.status, 
    s.name AS sender, 
    r.name AS receiver
FROM messages AS m
JOIN participants AS s ON m.sender_id = s.id
JOIN participants AS r ON m.receiver_id = r.id
JOIN (
  SELECT message_id, status
  FROM message_status
  WHERE timestamp = (
    SELECT MAX(timestamp)
    FROM message_status
    GROUP BY message_id
  )
) AS ms ON m.id = ms.message_id
WHERE m.receiver_id = :user_id
ORDER BY m.timestamp;
