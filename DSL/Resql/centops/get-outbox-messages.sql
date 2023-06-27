SELECT 
    m.id, 
    m.message, 
    m.status, 
    m.type, 
    m.timestamp,
    m.reply_to_message_id,
    m.sender_id, 
    s.name as sender,
    m.receiver_id, 
    r.name as receiver
FROM messages m
JOIN participants s ON m.sender_id = s.id
JOIN participants r ON m.receiver_id = r.id
WHERE m.sender_id = :user_id
ORDER BY m.timestamp;
