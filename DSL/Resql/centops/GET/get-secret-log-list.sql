SELECT
    id,
    created_at,
    client_id,
    ip_address,
    action,
    user_agent,
    CEIL(COUNT(*) OVER() / :page_size::DECIMAL) AS total_pages
FROM vault_api_action_log
ORDER BY id
OFFSET ((GREATEST(:page::INTEGER, 1) - 1) * :page_size::INTEGER ) LIMIT :page_size::INTEGER;