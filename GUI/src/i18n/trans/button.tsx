import { createTrans } from 'i18n/trans/index';
import { Trans } from 'react-i18next';

export const TransButton = createTrans({
  addClient: <Trans i18nKey="button.addClient" defaults="Add Client" />,
  cancel: <Trans i18nKey="button.cancel" defaults="Cancel" />,
  delete: <Trans i18nKey="button.delete" defaults="Delete" />,
  deployment: <Trans i18nKey="button.deployment" defaults="Deployment" />,
  generate: <Trans i18nKey="button.generate" defaults="Generate" />,
  generateCertificate: (
    <Trans
      i18nKey="button.generateCertificate"
      defaults="Generate certificate"
    />
  ),
  manifests: <Trans i18nKey="button.manifests" defaults="Manifests" />,
  save: <Trans i18nKey="button.save" defaults="Save" />,
  secrets: <Trans i18nKey="button.secrets" defaults="Secrets" />,
});
