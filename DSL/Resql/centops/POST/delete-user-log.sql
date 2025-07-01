INSERT INTO user_logs (log_id, deleted)
SELECT log_id, true
FROM user_logs
WHERE log_id = :log_id::uuid
  AND id = (SELECT max(id) FROM user_logs WHERE log_id = :log_id::uuid);