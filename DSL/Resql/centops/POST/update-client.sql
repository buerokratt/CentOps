INSERT INTO clients (name,
                     kubernetes_cluster_address,
                     kubernetes_cluster_namespace,
                     hashicorp_vault_token,
                     authentication_certificate,
                     created)
VALUES (:name,
        :kubernetes_cluster_address,
        :kubernetes_cluster_namespace,
        :hashicorp_vault_token,
        :authentication_certificate,
        :created::timestamp with time zone)