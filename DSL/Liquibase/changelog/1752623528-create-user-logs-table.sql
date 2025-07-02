-- liquibase formatted sql
-- changeset turkeshintroduct:1752623528

CREATE
EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE user_logs
(
    id         BIGSERIAL PRIMARY KEY,
    log_id     UUID      NOT NULL DEFAULT uuid_generate_v4(),
    method     TEXT NULL,
    path       TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    deleted    BOOLEAN   NOT NULL DEFAULT false
);

CREATE INDEX idx_user_logs_log_id ON user_logs (log_id);
CREATE INDEX idx_user_logs_deleted ON user_logs (deleted);