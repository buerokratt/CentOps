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
  source      = "/vault/templates/template.ctmpl"
  destination = "/vault/secrets/app.env"
}