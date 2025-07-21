-- liquibase formatted sql
-- changeset bodax:1753412902


ALTER TABLE user_logs
    ADD COLUMN user_id_code VARCHAR(255) NOT NULL ,
    ADD COLUMN first_name VARCHAR(255) NOT NULL ,
    ADD COLUMN last_name VARCHAR(255) NOT NULL ;

