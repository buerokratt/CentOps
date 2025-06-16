-- liquibase formatted sql
-- changeset turkeshintroduct:1710975000

CREATE TABLE clients
(
    id                           BIGSERIAL PRIMARY KEY,
    name                         TEXT      NOT NULL,
    kubernetes_cluster_address   TEXT      NOT NULL,
    kubernetes_cluster_namespace TEXT      NOT NULL,
    hashicorp_vault_token        TEXT      NOT NULL,
    authentication_certificate   TEXT      NOT NULL,
    deleted                      BOOLEAN   DEFAULT FALSE,
    created                      TIMESTAMP WITH TIME ZONE DEFAULT now()
);