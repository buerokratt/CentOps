-- liquibase formatted sql
-- changeset ahmedyasser:1687150478

CREATE TYPE manifest_history_type AS ENUM('create', 'update' , 'approved');
