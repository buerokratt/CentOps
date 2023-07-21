-- liquibase formatted sql
-- changeset Karl Jõgi:1686054376

CREATE TYPE participant_type AS ENUM('unknown', 'chatbot', 'dmr', 'classifier');
