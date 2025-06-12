import { createTrans } from 'i18n/trans/index';
import { Trans } from 'react-i18next';

export const TransTitle = createTrans({
  client: <Trans i18nKey="title.client" defaults="Client {{client}}" />,
  certificate: <Trans i18nKey="title.certificate" defaults="Certificate" />,
});
