vault {
  address = "http://vault:8200"
}

auto_auth {
  method "token_file" {
    config = {
      token_file_path = "/vault/secrets/.vault-token"
    }
  }
}

template {
  source      = "/vault/templates/resql-template.ctmpl"
  destination = "/vault/secrets/resql.env"
}

template {
  source      = "/vault/templates/resql-users-template.ctmpl"
  destination = "/vault/secrets/resql-users.env"
}

template {
  source      = "/vault/templates/database-template.ctmpl"
  destination = "/vault/secrets/database.env"
}

template {
  source      = "/vault/templates/tim-postgresql-template.ctmpl"
  destination = "/vault/secrets/tim-postgresql.env"
}