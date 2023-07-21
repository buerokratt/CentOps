-- liquibase formatted sql
-- changeset Karl Jõgi:1686206117

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE participants_invitations (
  id BIGSERIAL PRIMARY KEY,
  invitation_id uuid NOT NULL DEFAULT uuid_generate_v4 (),
  contact_email TEXT NOT NULL,
  valid BOOLEAN NOT NULL DEFAULT TRUE,
  institution_id BIGINT NOT NULL REFERENCES institutions,
  timestamp TIMESTAMP NOT NULL DEFAULT now()
);
