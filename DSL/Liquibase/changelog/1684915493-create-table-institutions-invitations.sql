-- liquibase formatted sql
-- changeset Karl Jõgi:1684915493

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE institutions_invitations (
  id BIGSERIAL PRIMARY KEY,
  invitation_id uuid NOT NULL DEFAULT uuid_generate_v4 (),
  user_email TEXT NOT NULL,
  valid BOOLEAN NOT NULL DEFAULT TRUE,
  timestamp TIMESTAMP NOT NULL DEFAULT now()
);
