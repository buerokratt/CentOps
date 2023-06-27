-- liquibase formatted sql
-- changeset baha-a:1687759231

CREATE TYPE messages_status AS ENUM('SENT', 'ACCEPTED', 'REJECTED', 'OPENED');
CREATE TYPE messages_type AS ENUM('TEXT', 'IMAGE');

CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  sender_id BIGINT NOT NULL REFERENCES participants,
  receiver_id BIGINT NOT NULL REFERENCES participants,
  reply_to_message_id BIGINT NULL REFERENCES messages,
  message TEXT NOT NULL,
  status messages_status DEFAULT 'SENT',
  type messages_type DEFAULT 'TEXT',
  timestamp TIMESTAMP NOT NULL DEFAULT now()
);
