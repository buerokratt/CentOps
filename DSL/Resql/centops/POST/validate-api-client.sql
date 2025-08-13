WITH decoded_credentials AS (SELECT CASE
                                        WHEN :authorization IS NULL OR :authorization = '' THEN NULL
                                        WHEN length(:authorization) % 4 != 0 THEN NULL
                                        WHEN :authorization !~ '^[A-Za-z0-9+/]*={0,2}$' THEN NULL
                                        ELSE convert_from(decode(:authorization, 'base64'), 'SQL_ASCII')
                                        END AS credentials_text),
     parsed_credentials AS (SELECT CASE
                                       WHEN credentials_text IS NOT NULL AND credentials_text ~ '^[^:]+:[^:]+$'
                                           THEN split_part(credentials_text, ':', 1)
                                       ELSE NULL
                                       END AS api_key,
                                   CASE
                                       WHEN credentials_text IS NOT NULL AND credentials_text ~ '^[^:]+:[^:]+$'
                                           THEN split_part(credentials_text, ':', 2)
                                       ELSE NULL
                                       END AS api_secret
                            FROM decoded_credentials)
SELECT COALESCE(
               EXISTS (SELECT 1
                       FROM api_clients a
                                INNER JOIN parsed_credentials c ON (
                           c.api_key = a.api_key
                               AND c.api_key IS NOT NULL
                               AND c.api_secret IS NOT NULL
                               AND crypt(c.api_secret, a.api_secret) = a.api_secret
                               AND a.is_enabled = true
                           )),
               false
       ) ::text AS is_valid;