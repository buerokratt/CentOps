import { createTrans } from 'i18n/trans/index';
import { Trans } from 'react-i18next';

export const TransButton = createTrans({
  addClient: <Trans i18nKey="button.addClient" defaults="Add Client" />,
  addCluster: <Trans i18nKey="button.addCluster" defaults="Add cluster" />,
  addManifest: <Trans i18nKey="button.addManifest" defaults="Add Manifest" />,
  addSecret: <Trans i18nKey="button.addSecret" defaults="Add Secret" />,
  addUser: <Trans i18nKey="button.addUser" defaults="Add User" />,
  cancel: <Trans i18nKey="button.cancel" defaults="Cancel" />,
  backToSecrets: (
    <Trans i18nKey="button.backToSecrets" defaults="Back to secrets" />
  ),
  delete: <Trans i18nKey="button.delete" defaults="Delete" />,
  deployment: <Trans i18nKey="button.deployment" defaults="Deployment" />,
  difference: <Trans i18nKey="button.difference" defaults="Difference" />,
  duplicate: <Trans i18nKey="button.duplicate" defaults="Duplicate" />,
  edit: <Trans i18nKey="button.edit" defaults="Edit" />,
  generate: <Trans i18nKey="button.generate" defaults="Generate" />,
  generateCertificate: (
    <Trans
      i18nKey="button.generateCertificate"
      defaults="Generate certificate"
    />
  ),
  manifests: <Trans i18nKey="button.manifests" defaults="Manifests" />,
  pods: <Trans i18nKey="button.pods" defaults="Pods" />,
  save: <Trans i18nKey="button.save" defaults="Save" />,
  secrets: <Trans i18nKey="button.secrets" defaults="Secrets" />,
  testConnection: (
    <Trans i18nKey="button.testConnection" defaults="Test connection" />
  ),
});
