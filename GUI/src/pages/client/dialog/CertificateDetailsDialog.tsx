import { Certificate, Dialog } from 'components';
import { Trans } from 'react-i18next';

export const CertificateDetailsDialog = () => {
  return (
    <Dialog
      defaultOpen
      title={
        <Trans i18nKey="dialog.certificate.title" defaults="Certificate" />
      }
      onClose={() => {
        //
      }}
      style={{ maxWidth: '800px' }}
    >
      <Certificate />
    </Dialog>
  );
};
