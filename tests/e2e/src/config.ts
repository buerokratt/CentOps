export const GLOBAL_CONSTANTS = {
    BASE_URL: 'http://localhost:8050',
    API_PREFIX: '/centops',
    PAGE: 1,
    PAGE_SIZE: 1,
    UUID_REGEX: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
};

export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

export const CLIENT_TEST_DATA = {
    CERTIFICATE: "-----BEGIN CERTIFICATE-----\nMOCK\n-----END CERTIFICATE-----",
    CLUSTER_ADDRESS: "https://k8s.example.com:6443",
    CLUSTER_NAMESPACE: "default",
    ARGO_DEPLOYMENT_NAME: "testDeployment"
};

export const ENDPOINTS = {
    AUTH: '/auth/login',
    CLIENTS: {
        BASE: '/admin/clients',
        BY_ID: '/admin/client-by-id',
        MINIMAL: '/integration/clients'
    }
};