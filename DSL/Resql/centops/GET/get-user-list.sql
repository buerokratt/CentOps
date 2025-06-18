SELECT *
FROM users u
WHERE u.id = (SELECT max(id) FROM users WHERE user_id = u.user_id)
  AND u.deleted = false;