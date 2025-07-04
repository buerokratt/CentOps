import { createTrans } from 'i18n/trans/index';
import { Trans } from 'react-i18next';

export const TransToast = createTrans({
  deletion: <Trans i18nKey="toast.deletion" defaults="Delete" />,
  deletionSuccessfully: (
    <Trans
      i18nKey="toast.deletionSuccessfully"
      defaults="Deleted successfully"
    />
  ),
  deletionFailed: (
    <Trans i18nKey="toast.deletionFailed" defaults="Failed to delete" />
  ),
  notification: <Trans i18nKey="toast.notification" defaults="Notification" />,
  notificationError: (
    <Trans i18nKey="toast.notificationError" defaults="Error" />
  ),
  notificationErrorMsg: (
    <Trans i18nKey="toast.notificationErrorMsg" defaults="An error occurred" />
  ),
});
