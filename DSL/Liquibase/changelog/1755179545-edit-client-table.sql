-- liquibase formatted sql
-- changeset bohdanintro:1755179545

ALTER TABLE clients DROP COLUMN kubernetes_cluster_address;
ALTER TABLE clients ADD COLUMN kubernetes_cluster_id uuid;