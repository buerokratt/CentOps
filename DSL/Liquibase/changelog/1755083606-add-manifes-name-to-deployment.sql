-- liquibase formatted sql
-- changeset bohdanintro:1755083606

ALTER TABLE deployments ADD COLUMN manifest_name VARCHAR(256);
ALTER TABLE deployments RENAME COLUMN manifest_version TO manifest_git_helm_branch;

ALTER TABLE deployments
    ADD COLUMN tmp_manifest_id UUID DEFAULT uuid_generate_v4();

UPDATE deployments
SET tmp_manifest_id = uuid_generate_v4()
WHERE tmp_manifest_id IS NULL;

ALTER TABLE deployments
    RENAME COLUMN manifest_id TO old_manifest_id;

ALTER TABLE deployments
    DROP COLUMN old_manifest_id;

ALTER TABLE deployments
    RENAME COLUMN tmp_manifest_id TO manifest_id;

