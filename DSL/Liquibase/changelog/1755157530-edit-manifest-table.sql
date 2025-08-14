-- liquibase formatted sql
-- changeset bohdanintro:1755157530

ALTER TABLE manifests ADD COLUMN git_helm_repository VARCHAR(256);
ALTER TABLE manifests ADD COLUMN git_helm_path VARCHAR(256);
ALTER TABLE manifests ADD COLUMN id BIGSERIAL;

ALTER TABLE manifests RENAME COLUMN helm_version TO git_helm_branch;

ALTER TABLE manifests
    ADD COLUMN tmp_manifest_id UUID DEFAULT uuid_generate_v4();

UPDATE manifests
SET tmp_manifest_id = uuid_generate_v4()
WHERE tmp_manifest_id IS NULL;

ALTER TABLE manifests DROP CONSTRAINT IF EXISTS manifests_pkey;

ALTER TABLE manifests
    RENAME COLUMN manifest_id TO old_manifest_id;

ALTER TABLE manifests
    DROP COLUMN old_manifest_id;

ALTER TABLE manifests
    RENAME COLUMN tmp_manifest_id TO manifest_id;

CREATE INDEX idx_manifest_id ON manifests (manifest_id);



DROP INDEX IF EXISTS uniq_name_client_helm_version_active;

CREATE UNIQUE INDEX uniq_name_client_git_branch_manifest_active
    ON manifests(client_id, manifest_id, git_helm_branch, name)
    WHERE deleted = false;