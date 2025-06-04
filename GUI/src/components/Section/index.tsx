import type { PropsWithChildren } from 'react';
import { forwardRef } from 'react';

import './Section.scss';

export const Section = forwardRef<HTMLElement, PropsWithChildren>(
  ({ children }, ref) => {
    return (
      <section ref={ref} className="section">
        {children}
      </section>
    );
  },
);

Section.displayName = 'section';
