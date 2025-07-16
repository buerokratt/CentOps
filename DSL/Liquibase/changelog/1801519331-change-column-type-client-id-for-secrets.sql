-- liquibase formatted sql
-- changeset turkeshintroduct:1801519331

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER TABLE secrets ADD COLUMN client_id_uuid uuid;

UPDATE secrets SET client_id_uuid = uuid_generate_v4();

ALTER TABLE secrets DROP COLUMN client_id;

ALTER TABLE secrets RENAME COLUMN client_id_uuid TO client_id;

CREATE INDEX idx_secrets_client_id_not_deleted ON secrets (client_id) WHERE deleted = false;