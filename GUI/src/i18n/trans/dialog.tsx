import { createTrans } from 'i18n/trans/index';
import { Trans } from 'react-i18next';

export const TransDialog = createTrans({
  confirmChangesTitle: (
    <Trans i18nKey="dialog.confirmChanges.title" defaults="Confirm changes" />
  ),
  confirmChangesDescription: (
    <Trans
      i18nKey="dialog.deleteCertificate.description"
      defaults="Are you sure you want to save changes?"
    />
  ),
});
