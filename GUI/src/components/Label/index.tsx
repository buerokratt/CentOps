import type { PropsWithChildren, ReactNode } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import { MdOutlineCheck } from 'react-icons/md';
import { Tooltip } from 'components';

import './Label.scss';

type LabelProps = {
  type?: 'waring' | 'error' | 'info' | 'success' | 'warning-dark' | 'disabled';
  tooltip?: ReactNode;
};

export const Label = forwardRef<HTMLSpanElement, PropsWithChildren<LabelProps>>(
  ({ type = 'info', tooltip, children }, ref) => {
    const labelClasses = clsx(
      'label',
      `label--${type}`,
      tooltip && 'label--tooltip'
    );

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
