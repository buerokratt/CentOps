SELECT 
    m.id, 
    m.message, 
    m.status, 
    m.type, 
    m.timestamp,
    m.reply_to_message_id,
    s.sender_id, 
    s.sender_name,
    r.receiver_id, 
    r.receiver_name
FROM messages m
JOIN senders s ON m.sender_id = s.id
JOIN receivers r ON m.receiver_id = r.id,
WHERE m.sender_id = :user_id
ORDER BY m.timestamp;
