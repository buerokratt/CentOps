import { createTrans } from 'i18n/trans/index';
import { Trans } from 'react-i18next';

export const TransLabel = createTrans({
  [`deployment.DEPLOYED`]: (
    <Trans i18nKey="label.deployment.deployed" defaults="Deployed" />
  ),
  [`deployment.DEPLOYING`]: (
    <Trans i18nKey="label.deployment.deploying" defaults="Deployed" />
  ),
  [`deployment.FAILED`]: (
    <Trans i18nKey="label.deployment.failed" defaults="Failed" />
  ),
  expiring: <Trans i18nKey="label.expiring" defaults="Expiring" />,
  invalid: <Trans i18nKey="label.invalid" defaults="Invalid" />,
  [`pods.BOOTING`]: (
    <Trans i18nKey="label.deployment.booting" defaults="Booting" />
  ),
  [`pods.RUNNING`]: (
    <Trans i18nKey="label.deployment.running" defaults="Running" />
  ),
  [`pods.NOT_RUNNING`]: (
    <Trans i18nKey="label.deployment.notRunning" defaults="Not running" />
  ),
  revoked: <Trans i18nKey="label.revoked" defaults="Revoked" />,
  valid: <Trans i18nKey="label.valid" defaults="Valid" />,
});
