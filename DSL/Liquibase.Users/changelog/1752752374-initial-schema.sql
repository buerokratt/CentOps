-- liquibase formatted sql
-- changeset 1AhmedYasser:1752752374

CREATE TABLE "user" (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    login VARCHAR(50) NOT NULL UNIQUE,
    id_code VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(60),
    display_name VARCHAR(50),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    created TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE authority (
    name VARCHAR(50) NOT NULL PRIMARY KEY
);

INSERT INTO authority(name)
VALUES ('ROLE_ADMINISTRATOR');

CREATE TABLE user_authority (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL UNIQUE,
    authority_name VARCHAR[] NOT NULL,
    created TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE configuration (
    id BIGSERIAL PRIMARY KEY,
    key VARCHAR(128),
    value VARCHAR(128),
    deleted BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO configuration(key, value)
VALUES ('session_length', '120');
