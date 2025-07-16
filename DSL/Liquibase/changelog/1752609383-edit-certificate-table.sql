-- liquibase formatted sql
-- changeset bodax:1752609383

ALTER TABLE certificates
    DROP COLUMN IF EXISTS certificate_id,
    DROP COLUMN IF EXISTS certificate_value,
    DROP COLUMN IF EXISTS serial_number,
    DROP COLUMN IF EXISTS valid_until,
    DROP COLUMN IF EXISTS private_key_encrypted,
    DROP COLUMN IF EXISTS deleted;

ALTER TABLE certificates
    ADD COLUMN IF NOT EXISTS public_key TEXT NOT NULL;
