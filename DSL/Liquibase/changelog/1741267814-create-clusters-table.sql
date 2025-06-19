-- liquibase formatted sql
-- changeset turkeshintroduct:1741267814

CREATE
EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE clusters
(
    id             BIGSERIAL PRIMARY KEY,
    cluster_id     UUID      NOT NULL DEFAULT uuid_generate_v4(),
    name           TEXT,
    ip_address     TEXT,
    argo_api_url   TEXT,
    argo_api_token TEXT,
    created_at     TIMESTAMP NOT NULL DEFAULT now(),
    deleted        BOOLEAN   NOT NULL DEFAULT false
);

CREATE INDEX idx_clusters_cluster_id ON clusters (cluster_id);
CREATE INDEX idx_clusters_deleted ON clusters (deleted);
CREATE INDEX idx_clusters_cluster_id_deleted ON clusters (cluster_id, deleted);
CREATE INDEX idx_clusters_name ON clusters (name);