import type { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import { useRef } from 'react';
import clsx from 'clsx';

import './Button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  appearance?: 'primary' | 'secondary' | 'text' | 'icon' | 'error' | 'success';
  outlined?: boolean;
  size?: 'm' | 's';
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  appearance = 'primary',
  outlined = false,
  size = 'm',
  disabled,
  children,
  ...rest
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  const buttonClasses = clsx('btn', `btn--${appearance}`, `btn--${size}`, {
    'btn--disabled': disabled,
    'btn--outlined': outlined,
  });

  return (
    <button className={buttonClasses} ref={ref} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
