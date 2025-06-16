INSERT INTO clients (name,
                     deleted,
                     created)
VALUES (:name,
        TRUE,
        :created::timestamp with time zone)
RETURNING id;