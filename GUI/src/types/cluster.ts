export interface Cluster {
  name: string;
  ipAddress: string;
  argoApiUrl: string;
}

export interface ApiCluster extends Cluster {
  id: string;
  clusterId: string;
  createdAt: string;
  updatedAt: string;
}
