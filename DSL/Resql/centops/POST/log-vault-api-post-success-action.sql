INSERT INTO vault_api_action_log (client_id,
                                  ip_address,
                                  action,
                                  secret_key,
                                  request_payload,
                                  status_code,
                                  user_agent)
VALUES (:client_id,
        :ip_address,
        :action,
        :secret_key,
        :request_payload::jsonb,
        :status_code,
        :user_agent) RETURNING id, timestamp;