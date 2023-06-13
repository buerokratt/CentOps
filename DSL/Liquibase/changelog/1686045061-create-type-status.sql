-- liquibase formatted sql
-- changeset Karl Jõgi:1686045061

CREATE TYPE status_type AS ENUM('unprocessed', 'inactive', 'active', 'deactivated', 'deleted');
