-- liquibase formatted sql
-- changeset Karl Jõgi:1684496276

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE invitation (
  id BIGSERIAL PRIMARY KEY,
  invitation_id uuid NOT NULL DEFAULT uuid_generate_v4 () UNIQUE,
  user_email TEXT NOT NULL,
  valid BOOLEAN NOT NULL DEFAULT TRUE
);
