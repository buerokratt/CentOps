import { createTrans } from 'i18n/trans/index';
import { Trans } from 'react-i18next';

export const TransTableHead = createTrans({
  certificate: (
    <Trans i18nKey="table.head.certificate" defaults="Certificate" />
  ),
  client: <Trans i18nKey="table.head.client" defaults="Client" />,
  cluster: <Trans i18nKey="table.head.cluster" defaults="Cluster" />,
  clusterIp: <Trans i18nKey="table.head.clusterIp" defaults="Cluster IP" />,
  clusterName: (
    <Trans i18nKey="table.head.clusterName" defaults="Cluster name" />
  ),
  createdAt: <Trans i18nKey="table.head.createdAt" defaults="Created at" />,
  dateTime: <Trans i18nKey="table.head.dateTime" defaults="Date and time" />,
  deployedAt: <Trans i18nKey="table.head.deployedAt" defaults="Deployed at" />,
  deployedBy: <Trans i18nKey="table.head.deployedBy" defaults="Deployed by" />,
  identificationNo: (
    <Trans
      i18nKey="table.head.identificationNo"
      defaults="Identification number"
    />
  ),
  image: <Trans i18nKey="table.head.image" defaults="Image" />,
  ipAddress: <Trans i18nKey="table.head.ipAddress" defaults="Ip Address" />,
  helmVersion: (
    <Trans i18nKey="table.head.helmVersion" defaults="Helm Chart Ver" />
  ),
  manifestVersion: (
    <Trans i18nKey="table.head.manifestVersion" defaults="Manifest ver." />
  ),
  manifestName: (
    <Trans i18nKey="table.head.manifestName" defaults="Manifest name" />
  ),
  metaData: <Trans i18nKey="table.head.metaData" defaults="Meta data" />,
  method: <Trans i18nKey="table.head.method" defaults="Method" />,
  name: <Trans i18nKey="table.head.name" defaults="Name" />,
  nameSpace: <Trans i18nKey="table.head.nameSpace" defaults="Name space" />,
  operation: <Trans i18nKey="table.head.operation" defaults="Operation" />,
  path: <Trans i18nKey="table.head.path" defaults="Path" />,
  updatedAt: <Trans i18nKey="table.head.updatedAt" defaults="Updated at" />,
  user: <Trans i18nKey="table.head.user" defaults="User" />,
  userAgent: <Trans i18nKey="table.head.userAgent" defaults="User Agent" />,
  usersDb: <Trans i18nKey="table.head.usersDb" defaults="UsersDB" />,
  userIdCode: <Trans i18nKey="table.head.userIdCode" defaults="User Id" />,
  usersName: <Trans i18nKey="table.head.usersName" defaults="User name" />,
});
