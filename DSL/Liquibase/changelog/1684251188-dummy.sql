-- liquibase formatted sql
-- changeset baha-a:1684251188
CREATE TABLE dummy (
  id BIGSERIAL PRIMARY KEY,
  status TEXT NOT NULL
);

INSERT INTO dummy
VALUES (1, 'off');
