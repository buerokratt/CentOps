#!/bin/bash

# Set strict mode
set -euo pipefail

# ========================
# CROSS-PLATFORM COMPATIBILITY SETUP
# ========================

# Detect system type
case "$(uname -s)" in
    Linux*)     SYSTEM="Linux";;
    Darwin*)    SYSTEM="Mac";;
    CYGWIN*)    SYSTEM="Cygwin";;
    MINGW*)     SYSTEM="MinGw";;
    *)          SYSTEM="UNKNOWN"
esac

# Initialize variables
IS_WINDOWS=false
if [[ "$SYSTEM" == "Cygwin" || "$SYSTEM" == "MinGw" ]]; then
    IS_WINDOWS=true
fi

# Function to normalize paths
clean_path() {
    local path="$1"
    if $IS_WINDOWS; then
        path=$(cygpath -w "$path")
        # Convert backslashes to forward slashes for Docker compatibility
        echo "$path" | sed 's/\\/\//g'
    else
        echo "$path"
    fi
}

# Windows-compatible version of tee
safe_tee() {
    if $IS_WINDOWS && ! command -v tee >/dev/null 2>&1; then
        cat > "$1"
    else
        tee -a "$1"
    fi
}

# Windows-compatible chmod
safe_chmod() {
    if ! $IS_WINDOWS; then
        chmod "$@"
    fi
}

# ========================
# CORE FUNCTIONS
# ========================

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

wait_for_vault_ready() {
    local attempts=0
    local max_attempts=12

    while [ $attempts -lt $max_attempts ]; do
        if ! docker ps | grep -q "$VAULT_CONTAINER_NAME"; then
            log "Vault container not running!"
            docker logs vault
            return 1
        fi

        local status_cmd="curl -s -o /dev/null -w '%{http_code}' http://localhost:8200/v1/sys/health"
        if $IS_WINDOWS; then
            STATUS_CODE=$(docker exec vault cmd //c "curl.exe $status_cmd" || echo "000")
        else
            STATUS_CODE=$(docker exec vault sh -c "$status_cmd" || echo "000")
        fi

        log "Health check status code: $STATUS_CODE"
        if [ "$STATUS_CODE" = "501" ] || [ "$STATUS_CODE" = "200" ] || [ "$STATUS_CODE" = "503" ]; then
            return 0
        fi

        attempts=$((attempts + 1))
        sleep 5
        log "Waiting... (attempt $attempts/$max_attempts)"
    done

    log "ERROR: Vault failed to become ready after $max_attempts attempts"
    docker logs vault
    return 1
}

clean_vault() {
    log "Cleaning up previous Vault deployment..."
    docker compose down vault vault-agent vault-unseal >/dev/null 2>&1 || true
    docker rm -f vault >/dev/null 2>&1 || true

    if $IS_WINDOWS; then
        rm -rf "${VAULT_DATA_PATH}" || true
        mkdir -p "${VAULT_DATA_PATH}/data"
    else
        rm -rf "${VAULT_DATA_PATH}"
        mkdir -p "${VAULT_DATA_PATH}/data"
        safe_chmod -R 777 "${VAULT_DATA_PATH}"
    fi
}

load_config() {
    log "Loading configuration..."

    # Set direct defaults (no .env-values loading)
    VAULT_CONTAINER_NAME="vault"
    VAULT_DATA_PATH=$(clean_path "$HOME/.vault")

    # Load secrets file if exists
    if [ -f "./vault/.env-secrets" ]; then
        source ./vault/.env-secrets
    else
        log "ERROR: .env-secrets file missing!"
        exit 1
    fi

    log "Configuration loaded"

    # Check ALL required variables with consistent error messages
    : "${POSTGRES_USER:?ERROR: POSTGRES_USER is not set}"
    : "${POSTGRES_PASSWORD:?ERROR: POSTGRES_PASSWORD is not set}"
    : "${POSTGRES_DATABASES:?ERROR: POSTGRES_DATABASES is not set}"
    : "${RESQL_DATASOURCE_NAME:?ERROR: RESQL_DATASOURCE_NAME is not set}"
    : "${RESQL_JDBC_URL:?ERROR: RESQL_JDBC_URL is not set}"
    : "${RESQL_USERNAME:?ERROR: RESQL_USERNAME is not set}"
    : "${RESQL_PASSWORD:?ERROR: RESQL_PASSWORD is not set}"
    : "${RESQL_USERS_DATASOURCE_NAME:?ERROR: RESQL_USERS_DATASOURCE_NAME is not set}"
    : "${RESQL_USERS_JDBC_URL:?ERROR: RESQL_USERS_JDBC_URL is not set}"
    : "${RESQL_USERS_USERNAME:?ERROR: RESQL_USERS_USERNAME is not set}"
    : "${RESQL_USERS_PASSWORD:?ERROR: RESQL_USERS_PASSWORD is not set}"
    : "${TIM_POSTGRES_USER:?ERROR: TIM_POSTGRES_USER is not set}"
    : "${TIM_POSTGRES_PASSWORD:?ERROR: TIM_POSTGRES_PASSWORD is not set}"
    : "${TIM_POSTGRES_DB:?ERROR: TIM_POSTGRES_DB is not set}"
    : "${TIM_POSTGRES_HOST_AUTH_METHOD:?ERROR: TIM_POSTGRES_HOST_AUTH_METHOD is not set}"
}

initialize_vault() {
    log "Initializing Vault..."

    clean_vault

    if ! docker compose up -d vault; then
        log "ERROR: Failed to start Vault container"
        exit 1
    fi

    # Install curl only once
    if $IS_WINDOWS; then
        docker exec vault cmd //c "curl.exe --version >nul 2>&1 || (echo Installing curl... && powershell -Command Invoke-WebRequest -Uri https://curl.se/windows/dl-7.81.0/curl-7.81.0-win64-mingw.zip -OutFile curl.zip && powershell -Command Expand-Archive curl.zip -DestinationPath C:\ && del curl.zip)"
    else
        docker exec vault sh -c "command -v curl >/dev/null 2>&1 || apk add --no-cache curl"
    fi

    wait_for_vault_ready || exit 1

    INIT_STATUS=$(docker exec vault vault status 2>/dev/null | grep 'Initialized' | awk '{print $2}' || true)
    log "Vault initialized status: $INIT_STATUS"

    if [ "$INIT_STATUS" = "true" ]; then
        log "Vault is already initialized"
        if [ ! -f "${VAULT_DATA_PATH}/.unseal-key" ] || [ ! -f "${VAULT_DATA_PATH}/.vault-token" ]; then
            log "WARNING: .unseal-key or .vault-token is missing!"
        fi
        return
    fi

    INIT_OUTPUT=$(docker exec vault vault operator init \
        -key-shares=1 \
        -key-threshold=1 \
        -format=json 2>&1 || true)
    log "Vault initialization output: $INIT_OUTPUT"

    if echo "$INIT_OUTPUT" | grep -q "Vault is already initialized"; then
        log "Vault is already initialized"
        return
    fi

    if ! ROOT_TOKEN=$(echo "$INIT_OUTPUT" | jq -r '.root_token' 2>/dev/null); then
        log "ERROR: Failed to initialize Vault"
        exit 1
    fi

    UNSEAL_KEY=$(echo "$INIT_OUTPUT" | jq -r '.unseal_keys_b64[0]')

    echo "$ROOT_TOKEN" > "${VAULT_DATA_PATH}/.vault-token"
    echo "$UNSEAL_KEY" > "${VAULT_DATA_PATH}/.unseal-key"
    safe_chmod 600 "${VAULT_DATA_PATH}/.vault-token"

    log "Vault initialized successfully"
}

unseal_vault() {
    log "Unsealing Vault..."
    if [ ! -f "${VAULT_DATA_PATH}/.unseal-key" ]; then
        log "ERROR: .unseal-key file missing!"
        exit 1
    fi

    export VAULT_UNSEAL_KEY=$(cat "${VAULT_DATA_PATH}/.unseal-key")
    docker exec vault vault operator unseal "$VAULT_UNSEAL_KEY"
    log "Unseal process started"

    # Wait for Vault to become unsealed
    local attempts=0
    local max_attempts=12
    while [ $attempts -lt $max_attempts ]; do
        SEALED=$(docker exec vault vault status 2>/dev/null | grep 'Sealed' | awk '{print $2}')
        log "Vault sealed status: $SEALED"
        if [ "$SEALED" = "false" ]; then
            log "Vault is unsealed."
            return
        fi
        attempts=$((attempts + 1))
        sleep 5
        log "Waiting for Vault to unseal... (attempt $attempts/$max_attempts)"
    done
    log "ERROR: Vault did not unseal after $max_attempts attempts."
    exit 1
}

configure_secrets() {
    if [ ! -f "${VAULT_DATA_PATH}/.vault-token" ]; then
        log "WARNING: .vault-token is missing! Skipping Vault secrets configuration."
        return
    fi
    log "Configuring Vault secrets..."

    VAULT_TOKEN=$(cat "${VAULT_DATA_PATH}/.vault-token")

    # Enable KV secrets (suppress 'already enabled' error)
    ENABLE_OUTPUT=$(docker exec vault env VAULT_TOKEN="$VAULT_TOKEN" vault secrets enable -path=secret kv 2>&1 || true)
    if echo "$ENABLE_OUTPUT" | grep -q 'path is already in use'; then
        log "KV secrets engine already enabled at secret/"
    elif echo "$ENABLE_OUTPUT" | grep -v 'Success'; then
        log "Error enabling KV secrets engine: $ENABLE_OUTPUT"
        exit 1
    fi

    # Database secrets
    RESQL_OUTPUT=$(docker exec vault env VAULT_TOKEN="$VAULT_TOKEN" vault kv put secret/resql \
        sqlms_datasources_0_name="$RESQL_DATASOURCE_NAME" \
        sqlms_datasources_0_jdbcUrl="$RESQL_JDBC_URL" \
        sqlms_datasources_0_username="$RESQL_USERNAME" \
        sqlms_datasources_0_password="$RESQL_PASSWORD" 2>&1)
    if ! echo "$RESQL_OUTPUT" | grep -q 'Success!'; then log "Error writing secret/resql: $RESQL_OUTPUT"; exit 1; fi

    RESQL_USERS_OUTPUT=$(docker exec vault env VAULT_TOKEN="$VAULT_TOKEN" vault kv put secret/resql-users \
        sqlms_datasources_0_name="$RESQL_USERS_DATASOURCE_NAME" \
        sqlms_datasources_0_jdbcUrl="$RESQL_USERS_JDBC_URL" \
        sqlms_datasources_0_username="$RESQL_USERS_USERNAME" \
        sqlms_datasources_0_password="$RESQL_USERS_PASSWORD" 2>&1)
    if ! echo "$RESQL_USERS_OUTPUT" | grep -q 'Success!'; then log "Error writing secret/resql-users: $RESQL_USERS_OUTPUT"; exit 1; fi

    DATABASE_OUTPUT=$(docker exec vault env VAULT_TOKEN="$VAULT_TOKEN" vault kv put secret/database \
        POSTGRES_USER="$POSTGRES_USER" \
        POSTGRES_PASSWORD="$POSTGRES_PASSWORD" \
        POSTGRES_MULTIPLE_DATABASES="$POSTGRES_DATABASES" 2>&1)
    if ! echo "$DATABASE_OUTPUT" | grep -q 'Success!'; then log "Error writing secret/database: $DATABASE_OUTPUT"; exit 1; fi

    TIM_OUTPUT=$(docker exec vault env VAULT_TOKEN="$VAULT_TOKEN" vault kv put secret/tim-postgresql \
        POSTGRES_USER="$TIM_POSTGRES_USER" \
        POSTGRES_PASSWORD="$TIM_POSTGRES_PASSWORD" \
        POSTGRES_DB="$TIM_POSTGRES_DB" \
        POSTGRES_HOST_AUTH_METHOD="$TIM_POSTGRES_HOST_AUTH_METHOD" 2>&1)
    if ! echo "$TIM_OUTPUT" | grep -q 'Success!'; then log "Error writing secret/tim-postgresql: $TIM_OUTPUT"; exit 1; fi

    log "Secrets configured"
}

cleanup_containers() {
    log "Stopping and removing existing centops containers..."
    docker compose -p centops down --remove-orphans --volumes --timeout 30
    log "Existing containers cleaned up"
}

start_vault_agent() {
    if [ ! -f "${VAULT_DATA_PATH}/.vault-token" ]; then
        log "WARNING: .vault-token is missing! Skipping Vault Agent startup."
        return
    fi

    # Simply restart the container (no directory manipulation needed)
    log "Restarting vault-agent container..."
    docker compose up -d --force-recreate vault-agent

    # Basic verification that container is running
    if ! docker ps --filter "name=vault-agent" --format '{{.Status}}' | grep -q "Up"; then
        log "ERROR: Vault-agent container failed to start"
        docker logs vault-agent
        exit 1
    fi

    log "Vault Agent container restarted successfully"
}

main() {
    cleanup_containers

    if ! docker info >/dev/null 2>&1; then
        log "ERROR: Docker daemon is not running"
        exit 1
    fi

    load_config
    initialize_vault
    unseal_vault
    configure_secrets
    start_vault_agent

    log "Vault deployment completed successfully!"
    log "Access Vault UI at: http://localhost:8200"
    echo "SUCCESS: Vault automation completed"
}

main