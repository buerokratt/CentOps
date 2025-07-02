import 'components/Box/Box.scss';
import type { BaseHTMLAttributes, PropsWithChildren } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

type BoxProps = BaseHTMLAttributes<HTMLDivElement> & {
  color?: 'default' | 'white' | 'blue' | 'yellow' | 'green' | 'red' | 'gray';
  shadow?: boolean;
};

export const Box = forwardRef<HTMLDivElement, PropsWithChildren<BoxProps>>(
  ({ color = 'default', shadow, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('box', `box--${color}`, {
          shadow,
        })}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Box.displayName = 'box';
