#!/bin/bash
docker exec database psql users_db byk -c "INSERT INTO public."user" (login,password_hash,first_name,last_name,id_code,display_name) VALUES
         ('EE30303039914','OK','David','Shawn','EE30303039914','David');
         INSERT INTO user_authority (user_id, authority_name)
         VALUES ('EE30303039914', '{ROLE_ADMINISTRATOR}'::varchar[]);"

docker exec database psql users_db byk -c "INSERT INTO public."user" (login,password_hash,first_name,last_name,id_code,display_name) VALUES
         ('EE30303039915','OK','Ken','Stafford','EE30303039915','Ken');
         INSERT INTO user_authority (user_id, authority_name)
         VALUES ('EE30303039915', '{ROLE_ADMINISTRATOR}'::varchar[]);"

docker exec database psql users_db byk -c "INSERT INTO public."user" (login,password_hash,first_name,last_name,id_code,display_name) VALUES
         ('EE30303039916','OK','Karl','Perez','EE30303039916','Karl');
         INSERT INTO user_authority (user_id, authority_name)
         VALUES ('EE30303039916', '{ROLE_ADMINISTRATOR}'::varchar[]);"
