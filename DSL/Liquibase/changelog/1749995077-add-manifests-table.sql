-- liquibase formatted sql
-- changeset bodax:1749995077

DROP TABLE IF EXISTS
    manifests,
    manifests_history,
    manifests_updates
    CASCADE;

CREATE TABLE manifests (
                           manifest_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
                           name VARCHAR (100) NOT NULL,
                           client_id TEXT NOT NULL,
                           helm_version TEXT NOT NULL,
                           helm_values TEXT NOT NULL,
                           created_at TIMESTAMP DEFAULT NOW(),
                           updated_at TIMESTAMP,
                           deleted BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE INDEX idx_manifests_client_id ON manifests(client_id);
CREATE INDEX idx_manifests_not_deleted ON manifests(deleted) WHERE deleted = false;
CREATE UNIQUE INDEX uniq_client_helm_version_active ON manifests(client_id, helm_version) WHERE deleted = false;