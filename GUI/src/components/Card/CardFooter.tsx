import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

export type CardFooterProps = {
  bordered?: boolean;
};

export const CardFooter: FC<PropsWithChildren<CardFooterProps>> = ({
  children,
  bordered = true,
}) => {
  if (!children) return null;
  return (
    <div
      className={clsx('card__footer', {
        bordered,
      })}
    >
      {children}
    </div>
  );
};

CardFooter.displayName = 'CardFooter';
