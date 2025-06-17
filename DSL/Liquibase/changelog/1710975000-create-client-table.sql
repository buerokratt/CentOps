-- liquibase formatted sql
-- changeset turkeshintroduct:1710975000

CREATE TABLE clients
(
    id                           BIGSERIAL PRIMARY KEY,
    name                         TEXT NOT NULL,
    kubernetes_cluster_address   TEXT,
    kubernetes_cluster_namespace TEXT,
    authentication_certificate   TEXT,
    deleted                      BOOLEAN                  DEFAULT FALSE,
    created                      TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_clients_name_deleted ON clients(name, deleted);