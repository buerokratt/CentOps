export interface Client {
  name: string;
  clientId: string;
  // uuid
  kubernetesClusterId: string;
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
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

export interface ApiClientCertificate {
  certificateId: string;
  clientId: string;
  createdAt: string;
  revoked: boolean;
}

export enum ClientDeploymentStatuses {
  DEPLOYING = 'DEPLOYING',
  DEPLOYED = 'DEPLOYED',
  FAILED = 'FAILED',
}
export type ClientDeploymentStatus = keyof typeof ClientDeploymentStatuses;
export interface ClientDeployment {
  id: string;
  manifestGitHelmBranch: string;
  nameSpace: string;
  manifestId: string;
  deployedBy: string;
  deployedAt: string;
}

export interface ApiClientDeployment extends ClientDeployment {
  id: string;
  clientId: string;
  manifestId: string;
  manifestName: string;
  deployedByIdCode: string;
  argoDeployAppName: string;
  deployedBy: string; // firstName lastName
  status: ClientDeploymentStatus;
  createdAt: string;
}

export interface ApiClientDeploymentStatus {
  health: {
    lastTransitionTime: string;
    status: 'Healthy' | 'Unhealthy' | 'Unknown';
  };
  status: 'Synced' | 'Unsynced' | 'Unknown';
  errors?: {
    type: string;
    message: string;
    lastTransitionTime: string;
  }[];
}

export interface ClientManifest {
  name: string;
  gitHelmRepository: string;
  gitHelmPath: string;
  gitHelmBranch: string;
  helmValues: string;
}
export interface ApiClientManifest extends ClientManifest {
  clientId: string;
  manifestId: string;
  manifestName: string;
  createdAt: string;
  updatedAt: string;
  deployedAt: string;
  deleted: boolean;
}
