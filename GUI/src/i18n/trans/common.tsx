import { createTrans } from 'i18n/trans/index';
import { Trans } from 'react-i18next';

export const TransCommon = createTrans({
  off: <Trans i18nKey="common.off" defaults="Off" />,
  on: <Trans i18nKey="common.on" defaults="On" />,
});
