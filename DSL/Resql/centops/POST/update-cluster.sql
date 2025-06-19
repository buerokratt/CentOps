INSERT INTO clusters (cluster_id, name, ip_address, argo_api_url, argo_api_token)
SELECT cluster_id, :name, :ip_address, :argo_api_url, :argo_api_token
FROM clusters
WHERE cluster_id = :cluster_id::uuid
  AND id = (SELECT max(id) FROM clusters WHERE cluster_id = :cluster_id::uuid);