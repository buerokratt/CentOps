-- liquibase formatted sql
-- changeset bodax:1751363682

ALTER TABLE clients
    ADD COLUMN argo_app_deployment_name VARCHAR(100) NOT NULL;