import { createTrans } from 'i18n/trans/index';
import { Trans } from 'react-i18next';

export const TransField = createTrans({
  argoApiUrl: <Trans i18nKey="field.argoApiUrl" defaults="Argo API URL" />,
  burokrattNetwork: (
    <Trans i18nKey="field.burokrattNetwork" defaults="Bürokratt network" />
  ),
  fingerprint: <Trans i18nKey="field.fingerprint" defaults="Fingerprint" />,
  certificate: <Trans i18nKey="field.certificate" defaults="Certificate" />,
  clientName: <Trans i18nKey="field.clientName" defaults="Client name" />,
  clusterAddress: (
    <Trans i18nKey="field.clusterAddress" defaults="Cluster address" />
  ),
  clusterIp: <Trans i18nKey="field.clusterIp" defaults="Cluster IP" />,
  clusterName: <Trans i18nKey="field.clusterName" defaults="Cluster name" />,
  content: <Trans i18nKey="field.content" defaults="Content" />,
  commonName: <Trans i18nKey="field.commonName" defaults="Common name" />,
  country: <Trans i18nKey="field.country" defaults="Country" />,
  createdAt: <Trans i18nKey="field.createdAt" defaults="Created" />,
  environment: <Trans i18nKey="field.environment" defaults="Environment" />,
  firstName: <Trans i18nKey="field.firstName" defaults="First name" />,
  helm: <Trans i18nKey="field.helm" defaults="Helm" />,
  lastName: <Trans i18nKey="field.lastName" defaults="Last name" />,
  locality: <Trans i18nKey="field.locality" defaults="Locality" />,
  id: <Trans i18nKey="field.id" defaults="ID" />,
  identificationNo: (
    <Trans i18nKey="field.identificationNo" defaults="Identification number" />
  ),
  issuer: <Trans i18nKey="field.issuer" defaults="Issuer" />,
  json: <Trans i18nKey="field.json" defaults="JSON" />,
  manifest: <Trans i18nKey="field.manifest" defaults="Manifest" />,
  name: <Trans i18nKey="field.name" defaults="Name" />,
  nameSpace: <Trans i18nKey="field.nameSpace" defaults="Name space" />,
  organization: <Trans i18nKey="field.organization" defaults="Organization" />,
  organizationUnit: (
    <Trans i18nKey="field.organizationUnit" defaults="Organization unit" />
  ),
  stateOfProvince: (
    <Trans i18nKey="field.stateOfProvince" defaults="State of province" />
  ),
  vaultApiToken: (
    <Trans i18nKey="field.vaultApiToken" defaults="Vault API token" />
  ),
  version: <Trans i18nKey="field.version" defaults="Version" />,
  validFrom: <Trans i18nKey="field.validFrom" defaults="Valid from" />,
  validTo: <Trans i18nKey="field.validTo" defaults="Valid to" />,
  updatedAt: <Trans i18nKey="field.updatedAt" defaults="Updated" />,
  yaml: <Trans i18nKey="field.yaml" defaults="YAML" />,
});
