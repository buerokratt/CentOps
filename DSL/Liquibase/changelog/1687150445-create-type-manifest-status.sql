-- liquibase formatted sql
-- changeset ahmedyasser:1687150445

CREATE TYPE manifest_status AS ENUM('approved', 'pending_approval' , 'has_updates', 'rejected', 'published', 'deleted');
