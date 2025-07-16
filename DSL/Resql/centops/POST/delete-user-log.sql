INSERT INTO user_logs (log_id, user_id_code, first_name, last_name, deleted)
SELECT log_id, user_id_code, first_name, last_name, true
FROM user_logs
WHERE log_id = :log_id::uuid
  AND id = (SELECT max(id) FROM user_logs WHERE log_id = :log_id::uuid)
  AND EXISTS (
    SELECT 1 FROM user_logs
    WHERE log_id = :log_id::uuid
  );