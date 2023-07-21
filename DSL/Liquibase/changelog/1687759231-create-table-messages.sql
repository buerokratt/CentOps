-- liquibase formatted sql
-- changeset baha-a:1687759231

CREATE TYPE messages_status AS ENUM('SENT', 'RECEIVED');
CREATE TYPE messages_type AS ENUM('TEXT', 'IMAGE', 'NEW_MANIFEST','UPDATE_MANIFEST','NEW_MANIFEST_UPDATE', 'CHAT_MESSAGE');

CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  sender_id BIGINT NOT NULL REFERENCES participants,
  receiver_id BIGINT NOT NULL REFERENCES participants,
  reply_to_message_id BIGINT NULL REFERENCES messages,
  message TEXT NOT NULL,
  type messages_type DEFAULT 'TEXT',
  timestamp TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE message_status (
  id BIGSERIAL PRIMARY KEY,
  message_id BIGINT NOT NULL REFERENCES messages,
  status messages_status NOT NULL DEFAULT 'SENT',
  timestamp TIMESTAMP NOT NULL DEFAULT now()
);
