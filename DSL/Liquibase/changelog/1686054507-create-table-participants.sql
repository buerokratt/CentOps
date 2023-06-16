-- liquibase formatted sql
-- changeset Karl Jõgi:1686054507

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE participants (
  id BIGSERIAL PRIMARY KEY,
  unique_identifier uuid NOT NULL DEFAULT uuid_generate_v4 (),
  name TEXT NOT NULL,
  name_abbreviated TEXT NOT NULL,
  ip_address CIDR NOT NULL,
  host TEXT NOT NULL default 'http://localhost',
  contact_email TEXT NOT NULL,
  participant_status status_type NOT NULL DEFAULT 'unprocessed',
  participant_type participant_type NOT NULL DEFAULT 'unknown',
  security_token uuid NOT NULL DEFAULT uuid_generate_v4 (),
  institution_id BIGINT NOT NULL REFERENCES institutions,
  timestamp TIMESTAMP NOT NULL DEFAULT now()
);
