-- liquibase formatted sql
-- changeset bohdanintro:1753871848


ALTER TABLE manifests
    ADD COLUMN deployed_at TIMESTAMP WITH TIME ZONE;