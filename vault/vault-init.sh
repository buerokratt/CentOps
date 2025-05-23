#!/bin/bash

USER_HOME="$HOME"
OUTPUT_DIR="$USER_HOME/.vault"
OUTPUT_FILE="$OUTPUT_DIR/vault-init.json"

export VAULT_ADDR='http://127.0.0.1:8200'

mkdir -p "$OUTPUT_DIR"

if [ -f "$OUTPUT_FILE" ]; then
  echo "Vault already initialized. Init file found at $OUTPUT_FILE"
  exit 0
fi

echo "Running vault operator init ..."
vault operator init -key-shares=1 -key-threshold=1 -format=json > "$OUTPUT_FILE" 2> >(tee /dev/stderr >&2)

if [ $? -eq 0 ]; then
  if [ -s "$OUTPUT_FILE" ]; then
    echo "Vault initialized successfully!"
    echo "Init JSON saved to $OUTPUT_FILE"
  else
    echo "Vault init command succeeded but output file is empty!"
    exit 1
  fi
else
  echo "Vault initialization failed."
  exit 1
fi
