INSERT INTO vault_api_action_log (user_id_code,
                                  ip_address,
                                  action,
                                  secret_key,
                                  status_code,
                                  user_agent)
VALUES (:user_id_code,
        :ip_address,
        :action,
        :secret_key,
        :status_code,
        :user_agent) RETURNING id, created_at;