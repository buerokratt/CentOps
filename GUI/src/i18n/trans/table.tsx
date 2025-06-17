import { createTrans } from 'i18n/trans/index';
import { Trans } from 'react-i18next';

export const TransTableHead = createTrans({
  client: <Trans i18nKey="table.head.client" defaults="Client" />,
  clusterIp: <Trans i18nKey="table.head.clusterIp" defaults="Cluster IP" />,
  clusterName: (
    <Trans i18nKey="table.head.clusterName" defaults="Cluster name" />
  ),
  identificationNo: (
    <Trans
      i18nKey="table.head.identificationNo"
      defaults="Identification number"
    />
  ),
  nameSpace: <Trans i18nKey="table.head.nameSpace" defaults="Name space" />,
  updatedAt: <Trans i18nKey="table.head.updatedAt" defaults="Updated at" />,
  usersDb: <Trans i18nKey="table.head.usersDb" defaults="UsersDB" />,
  usersName: <Trans i18nKey="table.head.usersName" defaults="User name" />,
});
