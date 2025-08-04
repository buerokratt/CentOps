-- liquibase formatted sql
-- changeset turkeshintroduct:1830231547

ALTER TABLE vault_api_action_log
    ADD COLUMN first_name TEXT,
    ADD COLUMN last_name TEXT,
    ADD COLUMN client_name TEXT;