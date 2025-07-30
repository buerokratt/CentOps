-- liquibase formatted sql
-- changeset turkeshintroduct:1826197055

ALTER TABLE clients
    ADD COLUMN part_of_network boolean DEFAULT false;