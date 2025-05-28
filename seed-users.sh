#!/bin/bash
docker exec database psql users_db byk -c "INSERT INTO public."user" (login,password_hash,first_name,last_name,id_code,display_name,status,created) VALUES
         ('EE30303039914','','David','Shawn','EE30303039914','David','online','2023-06-10 10:30:14.266 +0200');
INSERT INTO public."user_authority" (user_id,authority_name,created) VALUES
         ('EE30303039914','{ROLE_ADMINISTRATOR}','2023-06-10 10:30:14.266 +0200');"

docker exec database psql users_db byk -c "INSERT INTO public."user" (login,password_hash,first_name,last_name,id_code,display_name,status,created) VALUES
         ('EE30303039915','password','Ken','Stafford','EE30303039915','Ken','online','2023-06-12 07:25:20.436 +0200');
INSERT INTO public."user_authority" (user_id,authority_name,created) VALUES
         ('EE30303039915','{ROLE_DEV_OPS}','2023-06-12 07:25:20.436 +0200');"

docker exec database psql users_db byk -c "INSERT INTO public."user" (login,password_hash,first_name,last_name,id_code,display_name,status,created) VALUES
         ('EE30303039916','password','Karl','Perez','EE30303039916','Karl','online','2023-06-16 05:11:17.466 +0200');
INSERT INTO public."user_authority" (user_id,authority_name,created) VALUES
         ('EE30303039916','{ROLE_SERVICE_MANAGER}','2023-06-16 05:11:17.466 +0200');"
