import { Button, Dialog } from 'components';
import { TransButton } from 'i18n/trans/button';
import { TransDialog } from 'i18n/trans/dialog';

export const ConfirmChangesDialog = () => {
  return (
    <Dialog
      defaultOpen={false}
      title={<TransDialog i18nKey="confirmChangesTitle" />}
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
      <TransDialog i18nKey="confirmChangesDescription" />
    </Dialog>
  );
};
