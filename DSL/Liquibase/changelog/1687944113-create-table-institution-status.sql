-- liquibase formatted sql
-- changeset baha-a:1687944113

CREATE TABLE institution_status (
  id BIGSERIAL PRIMARY KEY,
  institution_id BIGINT NOT NULL REFERENCES institutions,
  status status_type NOT NULL DEFAULT 'unprocessed',
  timestamp TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE institution_info (
  id BIGSERIAL PRIMARY KEY,
  institution_id BIGINT NOT NULL REFERENCES institutions,
  name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT now()
);

ALTER TABLE institutions DROP COLUMN name;
ALTER TABLE institutions DROP COLUMN contact_email;
ALTER TABLE institutions DROP COLUMN status;
