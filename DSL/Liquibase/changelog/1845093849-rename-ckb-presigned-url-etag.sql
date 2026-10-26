-- liquibase formatted sql
-- changeset ahmedyasser:1845093849

ALTER TABLE ckb_information RENAME COLUMN presigned_url_etag TO presigned_url_data_hash;
