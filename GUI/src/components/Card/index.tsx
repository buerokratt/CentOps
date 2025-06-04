import 'components/Card/Card.scss';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import clsx from 'clsx';

type CardProps = {
  header?: ReactNode;
  footer?: ReactNode;
  disablePadding?: boolean;
};

export const Card: FC<PropsWithChildren<CardProps>> = ({
  header,
  footer,
  disablePadding,
  children,
}) => {
  return (
    <div
      className={clsx('card', {
        'disable-padding': disablePadding,
      })}
    >
      {header && <div className="card__header">{header}</div>}
      <div className="card__body">{children}</div>
      {footer && <div className="card__footer">{footer}</div>}
    </div>
  );
};
