import { createTrans } from 'i18n/trans/index';
import { Trans } from 'react-i18next';

export const TransNav = createTrans({
  clients: <Trans i18nKey="nav.clients" defaults="Clients" />,
});
