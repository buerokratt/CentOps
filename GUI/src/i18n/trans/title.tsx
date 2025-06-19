import { createTrans } from 'i18n/trans/index';
import { Trans } from 'react-i18next';

export const TransTitle = createTrans({
  client: <Trans i18nKey="title.client" defaults="Client {{client}}" />,
  clientAdd: <Trans i18nKey="title.clientAdd" defaults="Add client" />,
  cluster: <Trans i18nKey="title.cluster" defaults="Cluster {{cluster}}" />,
  clusterAdd: <Trans i18nKey="title.clusterAdd" defaults="Add cluster" />,
  certificate: <Trans i18nKey="title.certificate" defaults="Certificate" />,
  manifestAdd: <Trans i18nKey="title.manifestAdd" defaults="Add manifest" />,
  manifestEdit: <Trans i18nKey="title.manifestEdit" defaults="Edit manifest" />,
  secretAdd: <Trans i18nKey="title.secretAdd" defaults="Add secret" />,
  secretEdit: <Trans i18nKey="title.secretEdit" defaults="Edit secret" />,
  secretDiff: <Trans i18nKey="title.secretDiff" defaults="Diff vaade" />,
  user: <Trans i18nKey="title.user" defaults="User {{user}}" />,
  userAdd: <Trans i18nKey="title.userAdd" defaults="Add user" />,
});
