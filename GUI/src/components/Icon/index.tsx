import type { CSSProperties, ReactNode, StyleHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import clsx from 'clsx';

import 'components/Icon/Icon.scss';

type IconProps = StyleHTMLAttributes<CSSProperties> & {
  label?: string | null;
  icon: ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
};

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ label, icon, className, size = 'small', ...rest }, ref) => {
    const iconClasses = clsx('icon', `icon--${size}`, className);

    return (
      <AccessibleIcon.Root label={label ?? ''}>
        <span ref={ref} className={iconClasses} style={rest.style}>
          {icon}
        </span>
      </AccessibleIcon.Root>
    );
  }
);

export default Icon;
