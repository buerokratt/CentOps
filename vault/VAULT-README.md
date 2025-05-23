### Use Vault HashiCorp storage for a docker compose

1. Add vault path for persistence storage as env variable:

Linux:
`export VAULT_DATA_PATH="$HOME/.vault"`
Windows: 
`setx VAULT_DATA_PATH "%USERPROFILE%\.vault"`

- Run `docker compose up -d vault`

- Initialize Vault (need only for the 1st run) `docker exec vault vault operator init -key-shares=1 -key-threshold=1`
- Output: ``Root Token``, ``Unseal Key`` must be saved

###Export credentials
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
- Dont know if it necessary : `docker exec vault vault policy write app-policy /path/to/agnet-policy.hcl`

#### Check Secrets
- Add secret to the storage: `docker exec vault vault kv put secret/app/credentials username="admin" password="mypassword"`
- Check or add secrets viu GUI: `http://localhost:8200`, `{Root Token}`  or inside vault-agent in `vault/secrets`

run docker compose up -> the main goal is to check that test app container is read secrets from shared folder

### Testing:
requirements: 
 vault container - is logged in and unsealed -> [INFO]  core: vault is unsealed 
 vault unseal container - Vault Unseal done 
 vault agent - [INFO]  agent: (runner) rendered "/vault/templates/template.ctmpl" => "/vault/secrets/app.env"
