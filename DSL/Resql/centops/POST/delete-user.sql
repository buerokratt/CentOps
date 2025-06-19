INSERT INTO users (user_id, deleted)
SELECT user_id, true
FROM users
WHERE user_id = :user_id::uuid
AND id IN (SELECT max(id) FROM users WHERE user_id = :user_id::uuid GROUP BY user_id);