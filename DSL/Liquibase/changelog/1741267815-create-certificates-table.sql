-- liquibase formatted sql
-- changeset turkeshintroduct:1741267815

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE certificates (
                              id BIGSERIAL PRIMARY KEY,
                              certificate_id UUID NOT NULL DEFAULT uuid_generate_v4(),
                              client_id UUID NOT NULL,
                              certificate_value TEXT,
                              serial_number TEXT,
                              created_at TIMESTAMP NOT NULL DEFAULT now(),
                              valid_until TIMESTAMP,
                              is_active BOOLEAN DEFAULT true,
                              private_key_encrypted TEXT,
                              deleted BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX idx_certificates_certificate_id ON certificates(certificate_id);
CREATE INDEX idx_certificates_client_id ON certificates(client_id);
CREATE INDEX idx_certificates_deleted ON certificates(deleted);
CREATE INDEX idx_certificates_client_id_deleted ON certificates(client_id, deleted);