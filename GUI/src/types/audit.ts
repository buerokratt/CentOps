import type { Method } from 'axios';
import type { LabelProps } from 'components/Label';

export const methodMap = new Map<Method, LabelProps['type']>([
  ['post', 'info'],
  ['put', 'info'],
  ['patch', 'warning'],
  ['delete', 'error'],
  ['get', 'success'],
]);

export interface AuditUserActivity {
  /** @format uuid */
  logId: string;
  method: Method;
  path: string;
  createdAt: string;
}

export enum AuditSecretsAccessOperations {
  Read = 'Read',
  Write = 'Write',
}
export type AuditSecretsAccessOperation =
  keyof typeof AuditSecretsAccessOperations;

export interface AuditSecretsAccess {
  /** @format uuid */
  id: string;
  clientId: string;
  ipAddress: string;
  action: Method;
  userAgent: string;
  timestamp: string;
}
