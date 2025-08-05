import { createTrans } from 'i18n/trans/index';
import { Trans } from 'react-i18next';

export const TransDialog = createTrans({
  confirmChangesTitle: (
    <Trans i18nKey="dialog.confirmChanges.title" defaults="Confirm changes" />
  ),
  confirmChangesDescription: (
    <Trans
      i18nKey="dialog.confirmChanges.description"
      defaults="Are you sure you want to save changes?"
    />
  ),
  confirmDeleteTitle: (
    <Trans
      i18nKey="dialog.confirmDeleteTitle.title"
      defaults={`Do you want to delete {{name}}?`}
    />
  ),
});
