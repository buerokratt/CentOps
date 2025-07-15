WITH update_result AS (
UPDATE documentations
SET content    = :content,
    updated_at = now() RETURNING 1
)
INSERT
INTO documentations (content)
SELECT :content WHERE NOT EXISTS (SELECT 1 FROM update_result);