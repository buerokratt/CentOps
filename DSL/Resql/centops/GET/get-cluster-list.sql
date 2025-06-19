SELECT id,
       cluster_id,
       name,
       ip_address,
       argo_api_url,
       argo_api_token,
       created_at
FROM clusters c
WHERE c.id = (SELECT max(id) FROM clusters WHERE cluster_id = c.cluster_id)
  AND c.deleted = false;