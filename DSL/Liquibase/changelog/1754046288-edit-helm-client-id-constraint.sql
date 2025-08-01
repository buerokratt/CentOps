-- liquibase formatted sql
-- changeset bohdanintro:1754046287


DROP INDEX IF EXISTS uniq_client_helm_version_active;

CREATE UNIQUE INDEX uniq_name_client_helm_version_active
    ON manifests(client_id, helm_version, name)
    WHERE deleted = false;