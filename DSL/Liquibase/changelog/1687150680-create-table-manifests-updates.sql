-- liquibase formatted sql
-- changeset ahmedyasser:1687150680

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "hstore";

CREATE TABLE manifests_updates (
  id BIGSERIAL PRIMARY KEY,
  parent_manifest_id uuid NOT NULL REFERENCES manifests (manifest_id),
  update_id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4 (),
  buerokratt_version TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP DEFAULT NULL,
  components JSONB NOT NULL DEFAULT '{}',
  extra_configs JSONB NOT NULL DEFAULT '{}',
  security_configs JSONB NOT NULL DEFAULT '{}',
  status manifest_status NOT NULL DEFAULT 'pending_approval'
);
