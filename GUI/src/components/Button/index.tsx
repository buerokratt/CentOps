import 'components/Button/Button.scss';
import {
  type ButtonHTMLAttributes,
  type ComponentPropsWithRef,
  createElement,
  type ElementType,
  type PropsWithChildren,
} from 'react';
import clsx from 'clsx';

type ButtonBaseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  appearance?: 'primary' | 'secondary' | 'text' | 'icon' | 'error' | 'success';
  outlined?: boolean;
  size?: 'm' | 's';
};

type OverrideProps<T extends ElementType, P extends object = object> = {
  component?: T;
} & Omit<ComponentPropsWithRef<T>, keyof P>;

export type ButtonProps<T extends ElementType = 'div'> = ButtonBaseProps &
  OverrideProps<T, ButtonBaseProps>;

export const Button = <T extends ElementType = 'button'>({
  appearance = 'primary',
  outlined = false,
  size = 'm',
  disabled,
  component,
  ...rest
}: PropsWithChildren<ButtonProps<T>>) => {
  const buttonClasses = clsx('btn', `btn--${appearance}`, `btn--${size}`, {
    'btn--disabled': disabled,
    'btn--outlined': outlined,
  });

  return createElement(component ?? 'button', {
    className: buttonClasses,
    disabled,
    ...rest,
  });
};
