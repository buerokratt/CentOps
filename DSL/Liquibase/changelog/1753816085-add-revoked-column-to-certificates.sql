-- liquibase formatted sql
-- changeset bohdanintro:1753816085

ALTER TABLE certificates
    ADD COLUMN revoked BOOLEAN NOT NULL DEFAULT false;