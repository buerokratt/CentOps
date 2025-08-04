export interface Client {
  name: string;
  clientId: string;
  // https://k8s.example.com:6443
  kubernetesClusterAddress: string;
  kubernetesClusterNamespace: string;
  argoAppDeploymentName: string;
  // "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----"
  authenticationCertificate: string;
  partOfNetwork: boolean;
}

export interface ApiClient extends Client {
  createdAt: string;
  updatedAt: string;
}

export interface ClientSecret {
  name: string;
  environment: string;
  data: string;
}

export interface ApiClientSecret extends ClientSecret {
  id: string;
  clientId: string;
  secretId: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

export interface ApiClientCertificate {
  certificateId: string;
  clientId: string;
  createdAt: string;
  deleted: boolean;
}

export enum ClientDeploymentStatuses {
  DEPLOYING = 'DEPLOYING',
  DEPLOYED = 'DEPLOYED',
  FAILED = 'FAILED',
}
export type ClientDeploymentStatus = keyof typeof ClientDeploymentStatuses;
export interface ClientDeployment {
  id: string;
  manifestVersion: string;
  nameSpace: string;
  manifestId: string;
  deployedBy: string;
  deployedAt: string;
}

export interface ApiClientDeployment extends ClientDeployment {
  deploymentId: string;
  manifestId: string;
  status: ClientDeploymentStatus;
  argoDeploymentId: string;
  argoDeployAppName: string;
  argoDeployErrMessage: string;
  deployedByIdCode: string;
  deployedByUsername: string;
  deployedByLastname: string;
  clientId: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

export interface ClientManifest {
  name: string;
  helmVersion: string;
  helmValues: string;
}
export interface ApiClientManifest extends ClientManifest {
  clientId: string;
  manifestId: string;
  createdAt: string;
  updatedAt: string;
  deployedAt: string;
  deleted: boolean;
}
