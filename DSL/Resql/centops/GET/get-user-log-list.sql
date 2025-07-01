SELECT
    log_id,
    method,
    path,
    created_at
FROM user_logs l
WHERE l.id = (SELECT max(id) FROM user_logs WHERE log_id = l.log_id)
  AND l.deleted = false;