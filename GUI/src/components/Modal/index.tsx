import type { FC, PropsWithChildren, ReactNode } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { Track } from 'components';
import './Modal.scss';

export interface ModalProps {
  title: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  title,
  footer,
  onClose,
  children,
}) => {
  return (
    <RadixDialog.Root defaultOpen={true} onOpenChange={onClose}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="modal__overlay" />
        <RadixDialog.Content className="modal">
          <div className="modal__header">
            <RadixDialog.Title className="h3 modal__title">
              {title}
            </RadixDialog.Title>
          </div>
          {children && <div className="modal__body">{children}</div>}
          {footer && (
            <Track className="modal__footer" gap={16} justify="end">
              {footer}
            </Track>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
