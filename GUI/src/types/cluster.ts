export interface Cluster {
  name: string;
  ipAddress: string;
  argoApiUrl: string;
}

export interface ApiCluster extends Cluster {
  clusterId: string;
  createdAt: string;
  updatedAt: string;
}
