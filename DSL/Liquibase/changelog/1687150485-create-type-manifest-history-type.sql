-- liquibase formatted sql
-- changeset ahmedyasser:1687150485

CREATE TYPE manifest_history_type AS ENUM('manifest', 'update');
