-- liquibase formatted sql
-- changeset turkeshintroduct:1840137025

ALTER TABLE user_logs
    ADD COLUMN ip_address TEXT;