import 'components/Card/Card.scss';
import {
  cloneElement,
  type FC,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import { CardHeader } from 'components/Card/CardHeader';
import { CardFooter } from 'components/Card/CardFooter';

type CardProps = {
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

export { CardHeader };
export { CardFooter };

export const Card: FC<PropsWithChildren<CardProps>> = ({
  header,
  footer,
  disablePadding,
  bordered = true,
  shadow,
  slots,
  children,
}) => {
  return (
    <div
      className={clsx('card', {
        'disable-padding': disablePadding,
        bordered,
        shadow,
      })}
    >
      {cloneElement(slots?.header ?? <CardHeader />, { children: header })}
      <div className="card__body">{children}</div>
      {cloneElement(slots?.footer ?? <CardFooter />, { children: footer })}
    </div>
  );
};
