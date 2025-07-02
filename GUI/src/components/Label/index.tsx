import type { PropsWithChildren, ReactNode } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import { MdOutlineCheck } from 'react-icons/md';
import { Tooltip } from 'components';

import './Label.scss';

export type LabelProps = {
  type?: 'warning' | 'error' | 'info' | 'success' | 'warning-dark' | 'disabled';
  tooltip?: ReactNode;
  inline?: boolean;
};

export const Label = forwardRef<HTMLSpanElement, PropsWithChildren<LabelProps>>(
  ({ type = 'info', tooltip, inline, children }, ref) => {
    const labelClasses = clsx('label', `label--${type}`, {
      ['label--tooltip']: tooltip,
      ['label--inline']: inline,
    });

    return (
      <span ref={ref} className={labelClasses}>
        {children}
        {tooltip && (
          <Tooltip content={tooltip}>
            <span className="label__icon">
              {type === 'success' ? <MdOutlineCheck /> : 'i'}
            </span>
          </Tooltip>
        )}
      </span>
    );
  }
);

Label.displayName = 'label';
