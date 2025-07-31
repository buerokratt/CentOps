-- liquibase formatted sql
-- changeset turkeshintroduct:1810524033

ALTER TABLE users
    ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE clusters
    ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE;