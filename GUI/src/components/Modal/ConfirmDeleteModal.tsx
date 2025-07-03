import { Button, Modal, Track } from 'components';
import type { ModalProps } from 'components/Modal/index';
import { type FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ButtonProps } from 'components/Button';
import { useToast } from 'hooks';

export interface ConfirmDeleteModalProps extends Omit<ModalProps, 'title'> {
  title?: string;
  name: string;
  onConfirm: () => void;
}

export interface ConfirmDeleteButtonProps<T> extends ButtonProps {
  entity: T;
  entityName: keyof T;
  onConfirm: (entity: T) => Promise<void>;
}

export const ConfirmDeleteButton = <T,>({
  entity,
  entityName,
  onConfirm,
  ...props
}: ConfirmDeleteButtonProps<T>) => {
  const [entityToDelete, setEntityIdToDelete] = useState<T | null>(null);

  const showConfirmDeleteModal = useCallback(
    () => setEntityIdToDelete(entity),
    [entity]
  );
  const closeConfirmDeleteModal = useCallback(
    () => setEntityIdToDelete(null),
    []
  );
  const toast = useToast();

  const { t } = useTranslation();
  const handleConfirm = useCallback(async () => {
    try {
      await onConfirm(entity);
      toast.open({
        type: 'success',
        title: t('toast.deletion'),
        message: t('toast.deletionSuccessfully'),
      });
    } catch {
      toast.open({
        type: 'error',
        title: t('toast.deletion'),
        message: t('toast.deletionFailed'),
      });
    }
  }, []);

  return (
    <>
      <Button onClick={showConfirmDeleteModal} {...props} />
      {Boolean(entityToDelete) && (
        <ConfirmDeleteModal
          name={entity[entityName] as string}
          onConfirm={handleConfirm}
          onClose={closeConfirmDeleteModal}
        />
      )}
    </>
  );
};

export const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = (props) => {
  const { t } = useTranslation();
  return (
    <Modal
      title={t('dialog.confirmDeleteTitle.title', {
        defaultValue: 'You about to delete this "{{name}}" ?',
        name: props.name,
      })}
      onClose={props.onClose}
    >
      <Track justify="end" gap={12}>
        <Button appearance="secondary" onClick={props.onClose}>
          Cancel
        </Button>
        <Button appearance="error" onClick={props.onConfirm}>
          Delete
        </Button>
      </Track>
    </Modal>
  );
};
