WITH latest AS (SELECT document_id, created_at
                FROM documentations
                ORDER BY id DESC
    LIMIT 1
    )
INSERT
INTO documentations (document_id, content, created_at, updated_at)
SELECT COALESCE(l.document_id, gen_random_uuid()),
       :content,
       COALESCE(l.created_at, now()),
       CASE WHEN l.document_id IS NOT NULL THEN now() ELSE NULL END
FROM latest l
         RIGHT JOIN (SELECT 1) AS dummy ON true;