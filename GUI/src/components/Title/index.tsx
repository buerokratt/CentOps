import type { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import { MdOutlineCheck } from 'react-icons/md';
import { Tooltip } from 'components';

import 'components/Title/Title.scss';

export type TitleType =
  | 'warning'
  | 'error'
  | 'info'
  | 'success'
  | 'warning-dark'
  | 'disabled';

export type TitleProps = HTMLAttributes<HTMLDivElement> & {
  type?: TitleType;
  tooltip?: ReactNode;
  inline?: boolean;
};

export const Title = forwardRef<HTMLDivElement, PropsWithChildren<TitleProps>>(
  ({ type = 'info', tooltip, inline, children, className, ...props }, ref) => {
    const labelClasses = clsx(
      'title',
      `title--${type}`,
      {
        ['title--tooltip']: tooltip,
        ['title--inline']: inline,
      },
      className
    );

    return (
      <div ref={ref} className={labelClasses} {...props}>
        {children}
        {tooltip && (
          <Tooltip content={tooltip}>
            <span className="title__icon">
              {type === 'success' ? <MdOutlineCheck /> : 'i'}
            </span>
          </Tooltip>
        )}
      </div>
    );
  }
);

Title.displayName = 'Title';
