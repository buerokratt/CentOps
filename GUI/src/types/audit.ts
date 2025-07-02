import type { Method } from 'axios';

export interface AuditUserActivity {
  id: string;
  user: string;
  method: Method;
  path: string;
  meta: string;
  timestamp: string;
}

export enum AuditSecretsAccessOperations {
  Read = 'Read',
  Write = 'Write',
}
export type AuditSecretsAccessOperation =
  keyof typeof AuditSecretsAccessOperations;

export interface AuditSecretsAccess {
  id: string;
  user: string;
  client: string;
  operation: AuditSecretsAccessOperation;
  meta: string;
  timestamp: string;
}
