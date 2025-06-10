import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

export type CardHeaderProps = {
  filled?: boolean;
  bordered?: boolean;
};

export const CardHeader: FC<PropsWithChildren<CardHeaderProps>> = ({
  children,
  filled = true,
  bordered = true,
}) => {
  if (!children) return null;
  return (
    <div
      className={clsx('card__header', {
        filled,
        bordered,
      })}
    >
      {children}
    </div>
  );
};

CardHeader.displayName = 'CardHeader';
