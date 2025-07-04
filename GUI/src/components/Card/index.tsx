import 'components/Card/Card.scss';
import {
  cloneElement,
  type ComponentPropsWithRef,
  createElement,
  type ElementType,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import { CardHeader } from 'components/Card/CardHeader';
import { CardFooter } from 'components/Card/CardFooter';

type CardBaseProps = {
  header?: ReactNode;
  footer?: ReactNode;
  disablePadding?: boolean;
  bordered?: boolean;
  shadow?: boolean;
  slots?: {
    header?: ReactElement;
    footer?: ReactElement;
  };
};

type OverrideProps<T extends ElementType, P extends object = object> = {
  component?: T;
} & Omit<ComponentPropsWithRef<T>, keyof P>;

type CardProps<T extends ElementType = 'div'> = CardBaseProps &
  OverrideProps<T, CardBaseProps>;

export { CardHeader };
export { CardFooter };

export const Card = <T extends ElementType>({
  header,
  footer,
  disablePadding,
  bordered = true,
  shadow,
  slots,
  children,
  component,
  ...rest
}: PropsWithChildren<CardProps<T>>) => {
  return createElement(
    component ?? 'div',
    {
      className: clsx('card', {
        'disable-padding': disablePadding,
        bordered,
        shadow,
      }),
      ...rest,
    },
    <>
      {cloneElement(slots?.header ?? <CardHeader />, { children: header })}
      <div className="card__body">{children}</div>
      {cloneElement(slots?.footer ?? <CardFooter />, { children: footer })}
    </>
  );
};
