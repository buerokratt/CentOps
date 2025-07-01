export interface Client {
  id: string;
  name: string;
}

export interface ClientSecret {
  id: string;
  name: string;
}

export interface ClientCertificate {
  id: string;
  name: string;
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
  deployedBy: string;
  deployedAt: string;
  status: ClientDeploymentStatus;
}

export enum ClientPodStatuses {
  BOOTING = 'BOOTING',
  RUNNING = 'RUNNING',
  NOT_RUNNING = 'NOT_RUNNING',
}
export type ClientPodStatus = keyof typeof ClientPodStatuses;
export interface ClientPod {
  id: string;
  name: string;
  image: string;
  createdAt: string;
  status: ClientPodStatus;
}

export interface ClientManifest {
  id: string;
  name: string;
  updatedAt: string;
}
