-- liquibase formatted sql
-- changeset ahmedyasser:1687150656

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "hstore";

CREATE TABLE manifests (
  id BIGSERIAL PRIMARY KEY,
  manifest_id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4 (),
  buerokratt_version TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP DEFAULT NULL,
  components JSONB NOT NULL DEFAULT '{}',
  extra_configs JSONB NOT NULL DEFAULT '{}',
  security_configs JSONB NOT NULL DEFAULT '{}',
  status manifest_status NOT NULL DEFAULT 'pending_approval'
);
