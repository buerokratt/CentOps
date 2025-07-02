INSERT INTO clients (name,
                     kubernetes_cluster_address,
                     kubernetes_cluster_namespace,
                     argo_app_deployment_name,
                     authentication_certificate,
                     created)
VALUES (:name,
        :kubernetes_cluster_address,
        :kubernetes_cluster_namespace,
        :argo_app_deployment_name,
        :authentication_certificate,
        :created::timestamp with time zone)