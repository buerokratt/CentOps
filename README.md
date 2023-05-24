# CentOps

Bürokratt Central Operations

### Dev environment setup

- Clone Ruuter

- Ruuter has an unresolved issue with allowing cross-origin credentials to be sent, for now fix this by adding: .allowCredentials(true); to line 24 in CORSConfiguration.java

- Navigate to Ruuter and build the image `docker build -t ruuter .`

- Clone Resql

- Navigate to Resql and build the image `docker build -t resql .`

- Clone Data Mapper

- Navigate to Data Mapper and build the image `docker build -t datamapper-node .`

- Clone TIM

- Navigate to TIM and build the image `docker build -t tim .`

#### NB! If running Apple Silicon, use docker buildx to add the platform flag. Example: `docker buildx build --platform=linux/amd64 -t ruuter .`

- To create the DB tables, run `bash init-databases.sh` in `./`
