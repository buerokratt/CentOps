-- liquibase formatted sql
-- changeset turkeshintroduct:1802850156

ALTER TABLE clients
    ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE;