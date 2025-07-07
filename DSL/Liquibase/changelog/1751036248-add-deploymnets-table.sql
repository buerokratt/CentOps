-- liquibase formatted sql
-- changeset bodax:1751036248

CREATE TABLE deployments
(
    id                      BIGSERIAL PRIMARY KEY,
    client_id               BIGINT NOT NULL,
    manifest_id             BIGINT NOT NULL,
    manifest_version        TEXT   NOT NULL,
    status                  TEXT,
    argo_deployment_id      uuid,
    argo_deploy_app_name    TEXT   NOT NULL,
    argo_deploy_err_message TEXT,
    deployed_by_id_code     TEXT   NOT NULL,
    deployed_by_username    TEXT   NOT NULL,
    deployed_by_lastname    TEXT   NOT NULL,
    created_at              TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_deployments_client_id ON deployments (client_id);