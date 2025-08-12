import { Button, Modal, Track } from 'components';
import type { ModalProps } from 'components/Modal/index';
import { type FC, type ReactNode, useCallback, useState } from 'react';
import type { ButtonProps } from 'components/Button';
import { TransButton } from 'i18n/trans/button';

export interface ConfirmModalProps extends ModalProps {
  onConfirm: () => void;
}

export interface ConfirmButtonProps extends Omit<ButtonProps, 'title'> {
  title: ReactNode;
  onConfirm: () => Promise<void>;
}

export const ConfirmButton = ({
  title,
  onConfirm,
  ...props
}: ConfirmButtonProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const showConfirmDeleteModal = useCallback(() => setOpen(true), []);
  const closeConfirmDeleteModal = useCallback(() => setOpen(false), []);
  const handleConfirm = useCallback(async () => {
    await onConfirm();
    closeConfirmDeleteModal();
  }, [onConfirm]);

  return (
    <>
      <Button onClick={showConfirmDeleteModal} {...props} />
      {isOpen && (
        <ConfirmModal
          title={title}
          onConfirm={handleConfirm}
          onClose={closeConfirmDeleteModal}
        />
      )}
    </>
  );
};

export const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  return (
    <Modal title={props.title} onClose={props.onClose}>
      <Track justify="end" gap={12}>
        <Button appearance="secondary" onClick={props.onClose}>
          <TransButton i18nKey="cancel" />
        </Button>
        <Button appearance="success" onClick={props.onConfirm}>
          <TransButton i18nKey="confirm" />
        </Button>
      </Track>
    </Modal>
  );
};
