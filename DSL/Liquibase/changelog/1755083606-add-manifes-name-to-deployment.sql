-- liquibase formatted sql
-- changeset bohdanintro:1755083606

ALTER TABLE deployments ADD COLUMN manifest_name VARCHAR(256)