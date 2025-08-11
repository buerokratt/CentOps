-- liquibase formatted sql
-- changeset bohdanintro:1754932812


CREATE INDEX idx_client_id_name_environment_is_not_deleted_unique ON secrets (client_id, name, environment) where deleted is false;