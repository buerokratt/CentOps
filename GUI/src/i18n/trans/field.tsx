import { createTrans } from 'i18n/trans/index';
import { Trans } from 'react-i18next';

export const TransField = createTrans({
  burokrattNetwork: (
    <Trans i18nKey="field.burokrattNetwork" defaults="Bürokratt network" />
  ),
  fingerprint: <Trans i18nKey="field.fingerprint" defaults="Fingerprint" />,
  clientName: <Trans i18nKey="field.clientName" defaults="Client name" />,
  clusterIp: <Trans i18nKey="field.clusterIp" defaults="Cluster IP" />,
  createdAt: <Trans i18nKey="field.createdAt" defaults="Created" />,
  id: <Trans i18nKey="field.id" defaults="ID" />,
  issuer: <Trans i18nKey="field.issuer" defaults="Issuer" />,
  nameSpace: <Trans i18nKey="field.nameSpace" defaults="Name space" />,
  vaultApiToken: (
    <Trans i18nKey="field.vaultApiToken" defaults="Vault API token" />
  ),
  validFrom: <Trans i18nKey="field.validFrom" defaults="Valid from" />,
  validTo: <Trans i18nKey="field.validTo" defaults="Valid to" />,
  updatedAt: <Trans i18nKey="field.updatedAt" defaults="Updated" />,
});
