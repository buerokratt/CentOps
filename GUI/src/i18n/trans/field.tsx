import { createTrans } from 'i18n/trans/index';
import { Trans } from 'react-i18next';

export const TransField = createTrans({
  argoApiUrl: <Trans i18nKey="field.argoApiUrl" defaults="Argo API URL" />,
  argoApiToken: <Trans i18nKey="field.argoApiUrl" defaults="Argo API Token" />,
  burokrattNetwork: (
    <Trans i18nKey="field.burokrattNetwork" defaults="Bürokratt network" />
  ),
  fingerprint: <Trans i18nKey="field.fingerprint" defaults="Fingerprint" />,
  clientName: <Trans i18nKey="field.clientName" defaults="Client name" />,
  clusterIp: <Trans i18nKey="field.clusterIp" defaults="Cluster IP" />,
  clusterName: <Trans i18nKey="field.clusterName" defaults="Cluster name" />,
  content: <Trans i18nKey="field.content" defaults="Content" />,
  createdAt: <Trans i18nKey="field.createdAt" defaults="Created" />,
  firstName: <Trans i18nKey="field.firstName" defaults="First name" />,
  lastName: <Trans i18nKey="field.lastName" defaults="Last name" />,
  id: <Trans i18nKey="field.id" defaults="ID" />,
  identificationNo: (
    <Trans i18nKey="field.identificationNo" defaults="Identification number" />
  ),
  issuer: <Trans i18nKey="field.issuer" defaults="Issuer" />,
  json: <Trans i18nKey="field.json" defaults="Json" />,
  name: <Trans i18nKey="field.name" defaults="Name" />,
  nameSpace: <Trans i18nKey="field.nameSpace" defaults="Name space" />,
  vaultApiToken: (
    <Trans i18nKey="field.vaultApiToken" defaults="Vault API token" />
  ),
  version: <Trans i18nKey="field.version" defaults="Version" />,
  validFrom: <Trans i18nKey="field.validFrom" defaults="Valid from" />,
  validTo: <Trans i18nKey="field.validTo" defaults="Valid to" />,
  updatedAt: <Trans i18nKey="field.updatedAt" defaults="Updated" />,
});
