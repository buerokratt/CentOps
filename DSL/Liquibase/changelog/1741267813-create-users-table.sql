-- liquibase formatted sql
-- changeset turkeshintroduct:1741267813

CREATE
EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users
(
    id         BIGSERIAL PRIMARY KEY,
    user_id    UUID      NOT NULL DEFAULT uuid_generate_v4(),
    first_name TEXT,
    last_name  TEXT,
    id_code    TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    deleted    BOOLEAN   NOT NULL DEFAULT false
);

CREATE INDEX idx_users_user_id ON users (user_id);
CREATE INDEX idx_users_deleted ON users (deleted);
CREATE INDEX idx_users_user_id_deleted ON users (user_id, deleted);
