-- liquibase formatted sql
-- changeset ahmedyasser:1687150446

CREATE TYPE manifest_status AS ENUM('created', 'approved', 'pending_approval' , 'has_updates', 'rejected', 'published', 'deleted');
