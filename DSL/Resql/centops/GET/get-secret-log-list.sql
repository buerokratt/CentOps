SELECT
    id,
    timestamp,
    client_id,
    ip_address,
    action,
    user_agent
FROM vault_api_action_log
ORDER BY timestamp DESC;