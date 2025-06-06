import type { CSSProperties, ReactNode, StyleHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import clsx from 'clsx';
import icons from 'icons/index.json';
import 'components/Icon/Icon.scss';

export type IconName = keyof typeof icons;

type IconProps = StyleHTMLAttributes<CSSProperties> & {
  label?: string | null;
  size?: 'small' | 'medium' | 'large';
  className?: string;
} & (
    | {
        icon: ReactNode;
        name?: never;
      }
    | {
        name: IconName;
        icon?: never;
      }
  );

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ label, icon, name, className, size = 'medium', ...rest }, ref) => {
    const iconClasses = clsx('icon', `icon--${size}`, className);

    return (
      <AccessibleIcon.Root label={label ?? ''}>
        <span ref={ref} className={iconClasses} style={rest.style}>
          {name ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <use xlinkHref={`/icons.svg#${name}`} />
            </svg>
          ) : (
            icon
          )}
        </span>
      </AccessibleIcon.Root>
    );
  }
);
