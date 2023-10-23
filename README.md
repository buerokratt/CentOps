# CentOps

Bürokratt Central Operations

### Dev environment setup

- Run setup-components.sh to setup to clone & build the images for all components `./setup-components.sh`

- Run `docker compose up -d`

- To create the DB tables, run `bash init-databases.sh` in `./`

##### Notes

- If you made changes to ruuter, rebuild the image again using `docker build -t ruuter .`

- If you made changes to resql, rebuild the image again using `docker build -t resql .`

- If you made changes to tim, rebuild the image again using `docker build -t tim .`

- If you made changes to data mapper, rebuild the image again using `docker build -t datamapper .`

- Ruuter configuration should be changed for all the endpoints to work. PUT and DELETE should be added to the allowedMethodTypes array. See more information https://github.com/buerokratt/Ruuter/blob/65889552329249665e48656ed866cdf99cda391f/samples/CONFIGURATION.md

##### Public Acccessed Pages

- Application: `{YOUR URL}/centops/application`
- Application With ID: `/centops/application/{APPLICATION ID}`
- Overview: `{YOUR URL}/centops/overview`
- Form: `{YOUR URL}/centops/form`
- Past Updates: `{YOUR URL}/centops/manifests/past_updates`
- Future Updates: `{YOUR URL}/centops/manifests/future_updates`

### Database setup

- For setting up the users database initially, run
  `docker run --platform linux/amd64 --network=bykstack riaee/byk-users-db:liquibase20220615 --url=jdbc:postgresql://database:5432/users_db --username=byk --password=01234 --changelog-file=./master.yml update`
- Run centops migrations in this repository by running the helper script `./migrate.sh`
- Run users migrations in this repository by running the helper script `./migrate-users.sh`
- To seed users with dummy users, run `./seed-users.sh`
- When creating centops new migrations, use the helper `./create-migration.sh name-of-migration` which will create a timestamped file in the correct directory and add the required headers
- When creating users new migrations, use the helper `./create-migration-users.sh name-of-migration` which will create a timestamped file in the correct directory and add the required headers

### TIM

- if you are running `Locally` then you need to curl the login request or run it on postman first to create and store the cookie in TIM and then on the browser create the cookie manully in the browser with name `customJwtCookie` and the value return from the curl
the curl request is as follows:
```
curl -X POST -H "Content-Type: application/json" -d '{
  "login": "EE30303039914",
  "password": ""
}' http://localhost:8050/login-user
```
