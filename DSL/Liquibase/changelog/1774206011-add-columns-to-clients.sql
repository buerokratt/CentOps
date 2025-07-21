-- liquibase formatted sql
-- changeset turkeshintroduct:1774206011

ALTER TABLE clients RENAME COLUMN created TO created_at;
ALTER TABLE clients
    ADD COLUMN client_id UUID NOT NULL DEFAULT uuid_generate_v4();

ALTER TABLE clients
    ALTER COLUMN name DROP NOT NULL;

ALTER TABLE clients
    ALTER COLUMN argo_app_deployment_name DROP NOT NULL;

CREATE INDEX idx_clients_client_id ON clients (client_id);