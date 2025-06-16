-- liquibase formatted sql
-- changeset bodax:1749995077

DROP TABLE IF EXISTS
    manifests,
    manifests_history,
    manifests_updates
    CASCADE;

CREATE TABLE manifests (
                           manifest_id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4 (),
                           name VARCHAR (100) NOT NULL,
                           client_id TEXT NOT NULL,
                           helm_version TEXT NOT NULL,
                           helm_values TEXT NOT NULL,
                           created_at TIMESTAMP DEFAULT NOW(),
                           updated_at TIMESTAMP,
                           deleted BOOLEAN NOT NULL DEFAULT FALSE,
                           PRIMARY KEY (manifest_id),
                           UNIQUE (client_id, manifest_id, helm_version)
);
CREATE INDEX idx_manifests_client_id ON manifests(client_id);