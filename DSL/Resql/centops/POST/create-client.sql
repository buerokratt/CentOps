INSERT INTO clients (name,
                     kubernetes_cluster_address,
                     kubernetes_cluster_namespace,
                     argo_app_deployment_name,
                     authentication_certificate,
                     created_at)
VALUES (:name,
        :kubernetes_cluster_address,
        :kubernetes_cluster_namespace,
        :argo_app_deployment_name,
        :authentication_certificate,
        :created_at::timestamp with time zone)