export interface Manifest {
  readonly buerokrattVersion?: string;
  readonly manifestId?: string;
  readonly historyId?: string;
  readonly parentManifestId?: string;
  readonly updateId?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly components?: string;
  readonly extraConfigs?: string;
  readonly securityConfigs?: string;
  readonly type?: string;
  readonly status?: string;
}
