import 'components/Toast/Toast.scss';
import type { FC } from 'react';
import { useState } from 'react';
import type { ToastType } from 'components/Toast/ToastContext';
import * as RadixToast from '@radix-ui/react-toast';

import {
  MdCheckCircleOutline,
  MdErrorOutline,
  MdOutlineClose,
  MdOutlineInfo,
  MdOutlineWarningAmber,
} from 'react-icons/md';
import clsx from 'clsx';
import { Icon } from 'components';

type ToastProps = {
  toast: ToastType;
  close: () => void;
};

const toastIcons = {
  info: <MdOutlineInfo />,
  success: <MdCheckCircleOutline />,
  warning: <MdOutlineWarningAmber />,
  error: <MdErrorOutline />,
};

export const Toast: FC<ToastProps> = ({ toast, close }) => {
  const [open, setOpen] = useState(true);

  const toastClasses = clsx('toast', `toast--${toast.type}`);

  return (
    <RadixToast.Root
      className={toastClasses}
      onEscapeKeyDown={close}
      open={open}
      onOpenChange={setOpen}
    >
      <RadixToast.Title className="toast__title h5">
        <Icon icon={toastIcons[toast.type]} />
        {toast.title}
      </RadixToast.Title>
      <RadixToast.Description className="toast__content">
        {toast.message}
      </RadixToast.Description>
      <RadixToast.Close onClick={close} className="toast__close">
        <Icon icon={<MdOutlineClose />} size="medium" />
      </RadixToast.Close>
    </RadixToast.Root>
  );
};
