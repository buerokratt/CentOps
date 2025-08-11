-- liquibase formatted sql
-- changeset turkeshintroduct:1838237052

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION hash_api_credentials()
RETURNS TRIGGER AS $func$
BEGIN
    NEW.api_key := crypt(NEW.api_key, gen_salt('bf', 8));  -- Added work factor
    NEW.api_secret := crypt(NEW.api_secret, gen_salt('bf', 8));
RETURN NEW;
END
$func$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_hash_credentials_before_insert
    BEFORE INSERT ON api_clients
    FOR EACH ROW EXECUTE FUNCTION hash_api_credentials();

CREATE OR REPLACE TRIGGER trg_hash_credentials_before_update
    BEFORE UPDATE ON api_clients
    FOR EACH ROW
    WHEN (NEW.api_key IS DISTINCT FROM OLD.api_key OR NEW.api_secret IS DISTINCT FROM OLD.api_secret)
EXECUTE FUNCTION hash_api_credentials();
