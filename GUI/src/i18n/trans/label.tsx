import { createTrans } from 'i18n/trans/index';
import { Trans } from 'react-i18next';

export const TransLabel = createTrans({
  expiring: <Trans i18nKey="label.expiring" defaults="Expiring" />,
  revoked: <Trans i18nKey="label.revoked" defaults="Revoked" />,
  valid: <Trans i18nKey="label.valid" defaults="Valid" />,
  invalid: <Trans i18nKey="label.invalid" defaults="Invalid" />,
});
