-- liquibase formatted sql
-- changeset Karl Jõgi:1684915500

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE institutions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  invitation_id uuid NOT NULL,
  user_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'SUBMITTED',
  timestamp TIMESTAMP NOT NULL DEFAULT now()
);
