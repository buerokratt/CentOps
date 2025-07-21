-- liquibase formatted sql
-- changeset bodax:1752656012

ALTER TABLE manifests ALTER COLUMN client_id TYPE UUID USING client_id::uuid;

ALTER TABLE deployments DROP COLUMN client_id;
ALTER TABLE deployments ADD COLUMN client_id UUID;
CREATE INDEX idx_deployments_client_id ON deployments (client_id);

ALTER TABLE secrets DROP COLUMN client_id;
ALTER TABLE secrets ADD COLUMN client_id UUID;
CREATE INDEX idx_secrets_client_id_not_deleted ON secrets (client_id) WHERE deleted = false;

ALTER TABLE vault_api_action_log RENAME COLUMN client_id TO user_id_code;
ALTER TABLE vault_api_action_log DROP COLUMN request_payload;
