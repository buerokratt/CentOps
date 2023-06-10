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

- If you made changes to data mapper, rebuild the image again using `docker build -t docker build -t datamapper .`
