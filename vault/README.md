### Use Vault HashiCorp storage for a docker compose

1. Add vault path for persistence storage as env variable:

Linux:
`export VAULT_DATA_PATH="$HOME/.vault"`
Windows: 
`setx VAULT_DATA_PATH "%USERPROFILE%\.vault"`

- Run `docker compose up -d vault`

- Initialize Vault (need only for the 1st run) `docker exec vault vault operator init -key-shares=1 -key-threshold=1`
- Output: ``Root Token``, ``Unseal Key`` must be saved

### Export credentials
---
Windows: 
- `"{Root Token}" | Set-Content "$env:USERPROFILE\.vault\.vault-token"`
- `setx VAULT_TOKEN_PATH "%USERPROFILE\.vault\.vault-token"`
- `setx VAULT_UNSEAL_KEY" "{Unseal Key}"`
---
Linux
- `echo "{Root Token}}" | cat > $HOME/.vault/.vault-token`
- `export VAULT_TOKEN_PATH="$HOME/.vault/.vault-token"`
- `export VAULT_UNSEAL_KEY="{Unseal Key}"`
---
### Init Vault (1st time)
- Unseal Vault  `docker exec -it vault vault operator unseal {Unseal Key}`
- Login to Vault `docker exec -it vault vault login {Root Token}`
- Enable secret storage `docker exec -it vault vault secrets enable -path=secret kv`

### Add secrets into vault: 
```shell
docker exec -it vault vault kv put secret/resql `
  sqlms_datasources_0_name="centops" `
  sqlms_datasources_0_jdbcUrl="jdbc:postgresql://database:5432/centops_db" `
  sqlms_datasources_0_username="byk" `
  sqlms_datasources_0_password="01234" 
```
### Add secrets into vault - for Mac: 
```shell
docker exec -it vault vault kv put secret/resql \
  sqlms_datasources_0_name="centops" \
  sqlms_datasources_0_jdbcUrl="jdbc:postgresql://database:5432/centops_db" \
  sqlms_datasources_0_username="byk" \
  sqlms_datasources_0_password="01234"
```

```shell
 docker exec -it vault vault kv put secret/resql-users `
  sqlms_datasources_0_name="users" `
  sqlms_datasources_0_jdbcUrl="jdbc:postgresql://database:5432/users_db" ` or //jdbc:postgresql://171.22.247.13:5433/byk
  sqlms_datasources_0_username="byk" `
  sqlms_datasources_0_password="01234"
```
### Mac
```shell
docker exec -it vault vault kv put secret/resql-users \
  sqlms_datasources_0_name="users" \
  sqlms_datasources_0_jdbcUrl="jdbc:postgresql://database:5432/users_db" \
  sqlms_datasources_0_username="byk" \
  sqlms_datasources_0_password="01234"
```

```shell
docker exec -it vault vault kv put secret/database `
  POSTGRES_USER="byk" `
  POSTGRES_PASSWORD="01234" `
  POSTGRES_MULTIPLE_DATABASES="users_db,centops_db
```
### Mac
```shell
docker exec -it vault vault kv put secret/database \
  POSTGRES_USER="byk" \
  POSTGRES_PASSWORD="01234" \
  POSTGRES_MULTIPLE_DATABASES="users_db,centops_db"
```

```shell
docker exec -it vault vault kv put secret/tim-postgresql `
  POSTGRES_USER="tim" `
  POSTGRES_PASSWORD="123" `
  POSTGRES_DB="tim" `
  POSTGRES_HOST_AUTH_METHOD="trust"
```
### Mac
```shell
docker exec -it vault vault kv put secret/tim-postgresql \
  POSTGRES_USER="tim" \
  POSTGRES_PASSWORD="123" \
  POSTGRES_DB="tim" \
  POSTGRES_HOST_AUTH_METHOD="trust"
```

#### Add and Check Secrets
- Add secret to the storage: `docker exec vault vault kv put secret/{app} username="admin" password="password"`
- Check or add secrets viu GUI: `http://localhost:8200`, `{Root Token}`  or  `docker exec -it vault vault kv get secret/resql`
-  if you are adding secret for existing app - edit *.ctmpl file in the /vault/templates/
- otherwive create new file in the templates directory and add this template into
`vault\vault-agent.hcl` as new template 
