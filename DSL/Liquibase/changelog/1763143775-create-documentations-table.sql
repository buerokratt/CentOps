-- liquibase formatted sql
-- changeset turkeshintroduct:1763143775

CREATE
EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE documentations
(
    id          BIGSERIAL PRIMARY KEY,
    document_id UUID      NOT NULL DEFAULT uuid_generate_v4(),
    content     TEXT      NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT now(),
    updated_at  TIMESTAMP,
    deleted     BOOLEAN   NOT NULL DEFAULT false
);

CREATE INDEX idx_documentation_document_id ON documentations (document_id);
CREATE INDEX idx_documentation_deleted ON documentations (deleted);