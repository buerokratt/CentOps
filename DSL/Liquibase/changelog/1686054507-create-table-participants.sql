-- liquibase formatted sql
-- changeset Karl Jõgi:1686054507

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE participants (
  id BIGSERIAL PRIMARY KEY,
  unique_identifier uuid NOT NULL DEFAULT uuid_generate_v4 (),
  participant_status status_type NOT NULL DEFAULT 'unprocessed',
  participant_type participant_type NOT NULL DEFAULT 'unknown',
  security_token uuid NOT NULL DEFAULT uuid_generate_v4 (),
  institution_id BIGINT NOT NULL REFERENCES institutions,
  timestamp TIMESTAMP NOT NULL DEFAULT now(),
  info JSON NOT NULL DEFAULT '{}'
);
