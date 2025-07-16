INSERT INTO vault_api_action_log (client_id,
                                  ip_address,
                                  action,
                                  secret_key,
                                  status_code,
                                  error_message,
                                  user_agent)
VALUES (:client_id,
        :ip_address,
        :action,
        :secret_key,
        :status_code,
        :error_message,
        :user_agent) RETURNING id, created_at;