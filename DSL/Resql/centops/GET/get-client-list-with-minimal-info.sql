SELECT
    client_id,
    name,
    authentication_certificate,
    created_at,
    updated_at,
    CEIL(
        COUNT(*) OVER () /:page_size::DECIMAL
    ) AS total_pages
FROM clients c
WHERE
    id = (
        SELECT max(id)
        FROM clients
        WHERE
            client_id = c.client_id
    )
    AND deleted = FALSE
    AND part_of_network = TRUE
    AND (
:filter_by_name = ''
        OR name ILIKE '%' ||:filter_by_name || '%'
    )
ORDER BY
    CASE
        WHEN:sort_order = 'desc' THEN name
    END DESC,
    CASE
        WHEN:sort_order = 'asc' THEN name
    END ASC
OFFSET (
        (
            GREATEST(:page::INTEGER, 1) - 1
        ) *:page_size::INTEGER
    )
LIMIT:page_size::INTEGER;