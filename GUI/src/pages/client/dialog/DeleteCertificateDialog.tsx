import { Button, Dialog } from 'components';
import { TransButton } from 'i18n/trans/button';
import { Trans } from 'react-i18next';

export const DeleteCertificateDialog = () => {
  return (
    <Dialog
      defaultOpen={false}
      title={
        <Trans
          i18nKey="dialog.deleteCertificate.title"
          defaults="Delete certificate"
        />
      }
      onClose={() => {
        //
      }}
      footer={
        <>
          <Button appearance="secondary">
            <TransButton i18nKey="cancel" />
          </Button>
          <Button appearance="error">
            <TransButton i18nKey="delete" />
          </Button>
        </>
      }
    >
      <Trans
        i18nKey="dialog.deleteCertificate.description"
        defaults="Are you sure you want to delete the certificate?"
      />
    </Dialog>
  );
};
