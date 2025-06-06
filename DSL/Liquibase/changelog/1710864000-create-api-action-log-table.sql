-- liquibase formatted sql
-- changeset turkeshintroduct:1710864000

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE vault_api_action_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  timestamp TIMESTAMP NOT NULL DEFAULT now(),
  client_id TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  action TEXT NOT NULL,
  secret_key TEXT NOT NULL,
  status_code INTEGER,
  error_message TEXT,
  request_payload JSONB,
  user_agent TEXT NOT NULL
);