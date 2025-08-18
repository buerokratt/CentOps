import { Button, Modal } from 'components';
import type { ModalProps } from 'components/Modal/index';
import {
  cloneElement,
  type ComponentPropsWithRef,
  createElement,
  type ElementType,
  type FC,
  type HTMLAttributes,
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  useCallback,
  useState,
} from 'react';
import { TransButton } from 'i18n/trans/button';

export interface ConfirmModalProps extends ModalProps {
  onConfirm: () => void;
  cancel?: boolean | ReactElement<HTMLAttributes<HTMLButtonElement>>;
  confirm?: boolean | ReactElement<HTMLAttributes<HTMLButtonElement>>;
}

type OverrideProps<T extends ElementType, P extends object = object> = {
  component?: T;
} & Omit<ComponentPropsWithRef<T>, keyof P>;

export type ConfirmButtonBaseProps = {
  title: ReactNode;
  button: ReactNode;
  onConfirm?: () => Promise<void>;
  cancel?: boolean | ReactElement<HTMLAttributes<HTMLButtonElement>>;
  confirm?: boolean | ReactElement<HTMLAttributes<HTMLButtonElement>>;
};

type ConfirmButtonProps<T extends ElementType> = ConfirmButtonBaseProps &
  OverrideProps<T, ConfirmButtonBaseProps>;

export const ConfirmButton = <T extends ElementType>({
  title,
  button,
  children,
  onConfirm,
  component,
  cancel,
  confirm,
  ...props
}: ConfirmButtonProps<T>) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const showConfirmDeleteModal = useCallback(() => setOpen(true), []);
  const closeConfirmDeleteModal = useCallback(() => setOpen(false), []);
  const handleConfirm = useCallback(async () => {
    await onConfirm?.();
    closeConfirmDeleteModal();
  }, [onConfirm]);

  return (
    <>
      {createElement(component ?? Button, {
        onClick: showConfirmDeleteModal,
        children: button,
        ...props,
      })}
      {isOpen && (
        <ConfirmModal
          title={title}
          onConfirm={handleConfirm}
          onClose={closeConfirmDeleteModal}
          cancel={cancel}
          confirm={confirm}
          children={children}
        />
      )}
    </>
  );
};

export const ConfirmModal: FC<PropsWithChildren<ConfirmModalProps>> = ({
  cancel = true,
  confirm = true,
  children,
  ...props
}) => {
  return (
    <Modal
      title={props.title}
      onClose={props.onClose}
      footer={
        <>
          {cancel &&
            (isValidElement(cancel) ? (
              cloneElement(cancel, {
                onClick: props.onClose,
              })
            ) : (
              <Button appearance="secondary" onClick={props.onClose}>
                {<TransButton i18nKey="cancel" />}
              </Button>
            ))}
          {confirm &&
            (isValidElement(confirm) ? (
              cloneElement(confirm, {
                onClick: props.onConfirm,
              })
            ) : (
              <Button appearance="success" onClick={props.onConfirm}>
                <TransButton i18nKey="confirm" />
              </Button>
            ))}
        </>
      }
    >
      {children}
    </Modal>
  );
};
