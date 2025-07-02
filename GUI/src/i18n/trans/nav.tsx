import { createTrans } from 'i18n/trans/index';
import { Trans } from 'react-i18next';

export const TransNav = createTrans({
  clients: <Trans i18nKey="nav.clients" defaults="Clients" />,
  clusters: <Trans i18nKey="nav.clusters" defaults="Clusters" />,
  documentation: <Trans i18nKey="nav.documentation" defaults="Documentation" />,
  settings: <Trans i18nKey="nav.settings" defaults="Settings" />,
  users: <Trans i18nKey="nav.users" defaults="Users" />,
});
