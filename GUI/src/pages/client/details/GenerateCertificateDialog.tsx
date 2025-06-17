import { Button, Dialog } from 'components';
import { TransButton } from 'i18n/trans/button';
import { Trans } from 'react-i18next';

export const GenerateCertificateDialog = () => {
  return (
    <Dialog
      defaultOpen={false}
      title={
        <Trans
          i18nKey="dialog.generateCertificate.title"
          defaults="Generate certificate"
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
          <Button appearance="primary">
            <TransButton i18nKey="generate" />
          </Button>
        </>
      }
    >
      <Trans
        i18nKey="dialog.generateCertificate.description"
        defaults="Previous certificate..."
      />
    </Dialog>
  );
};
