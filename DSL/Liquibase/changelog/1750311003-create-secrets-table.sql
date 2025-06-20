-- liquibase formatted sql
-- changeset bodax:1750311003


CREATE TABLE secrets
(
    id          BIGSERIAL PRIMARY KEY,
    name        TEXT  NOT NULL,
    client_id   BIGINT      NOT NULL,
    environment TEXT        NOT NULL,
    created_at  TIMESTAMP            DEFAULT NOW(),
    updated_at  TIMESTAMP,
    deleted     BOOLEAN     NOT NULL DEFAULT FALSE
);
CREATE INDEX idx_secrets_client_id_not_deleted ON secrets (client_id) WHERE deleted = false;
CREATE INDEX idx_secrets_name_not_deleted ON secrets (name) WHERE deleted = false;
