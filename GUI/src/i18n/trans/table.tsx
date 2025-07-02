import { createTrans } from 'i18n/trans/index';
import { Trans } from 'react-i18next';

export const TransTableHead = createTrans({
  certificate: (
    <Trans i18nKey="table.head.certificate" defaults="Certificate" />
  ),
  client: <Trans i18nKey="table.head.client" defaults="Client" />,
  clusterIp: <Trans i18nKey="table.head.clusterIp" defaults="Cluster IP" />,
  clusterName: (
    <Trans i18nKey="table.head.clusterName" defaults="Cluster name" />
  ),
  createdAt: <Trans i18nKey="table.head.createdAt" defaults="Created at" />,
  dateTime: <Trans i18nKey="table.head.dateTime" defaults="Date and time" />,
  deployedAt: <Trans i18nKey="table.head.deployedAt" defaults="Deployet at" />,
  deployedBy: <Trans i18nKey="table.head.deployedBy" defaults="Deployet by" />,
  identificationNo: (
    <Trans
      i18nKey="table.head.identificationNo"
      defaults="Identification number"
    />
  ),
  image: <Trans i18nKey="table.head.image" defaults="Image" />,
  manifestVersion: (
    <Trans i18nKey="table.head.manifestVersion" defaults="Manifest ver." />
  ),
  metaData: <Trans i18nKey="table.head.metaData" defaults="Meta data" />,
  method: <Trans i18nKey="table.head.method" defaults="Method" />,
  name: <Trans i18nKey="table.head.name" defaults="Name" />,
  nameSpace: <Trans i18nKey="table.head.nameSpace" defaults="Name space" />,
  operation: <Trans i18nKey="table.head.operation" defaults="Operation" />,
  path: <Trans i18nKey="table.head.path" defaults="Path" />,
  updatedAt: <Trans i18nKey="table.head.updatedAt" defaults="Updated at" />,
  user: <Trans i18nKey="table.head.user" defaults="User" />,
  usersDb: <Trans i18nKey="table.head.usersDb" defaults="UsersDB" />,
  usersName: <Trans i18nKey="table.head.usersName" defaults="User name" />,
});
