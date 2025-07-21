-- liquibase formatted sql
-- changeset turkeshintroduct:1780721462

ALTER TABLE vault_api_action_log RENAME COLUMN timestamp TO created_at;