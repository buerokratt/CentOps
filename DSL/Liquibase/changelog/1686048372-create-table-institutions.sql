-- liquibase formatted sql
-- changeset Karl Jõgi:1686048372

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE institutions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  status status_type NOT NULL DEFAULT 'unprocessed',
  timestamp TIMESTAMP NOT NULL DEFAULT now()
);
