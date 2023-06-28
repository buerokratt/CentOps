export interface Manifest {
  readonly historyId?: string;
  readonly parentManifestId?: string;
  readonly updateId?: string;
  readonly createdAt?: string;
  readonly components?: string;
  readonly extraConfigs?: string;
  readonly securityConfigs?: string;
  readonly type?: string;
  readonly status?: string;
}
