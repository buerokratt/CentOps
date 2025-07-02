import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef, useId } from 'react';
import clsx from 'clsx';
import { MdOutlinePalette } from 'react-icons/md';

import { Icon } from 'components';
import 'components/FormElements/FormElement/FormElement.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
  hideLabel?: boolean;
  colorInput?: boolean;
};

export const FormElement = forwardRef<HTMLDivElement, InputProps>(
  ({ label, disabled, hideLabel, colorInput, children }, ref) => {
    const id = useId();

    const className = clsx(
      'form-element',
      disabled && 'form-element--disabled'
    );

    return (
      <div ref={ref} className={className}>
        {!hideLabel && (
          <label htmlFor={id} className="form-element__label">
            {label}
          </label>
        )}
        <div className="form-element__wrapper">
          <div className="element">{children}</div>
          {colorInput && (
            <Icon
              icon={<MdOutlinePalette fontSize={20} color="rgba(0,0,0,0.54)" />}
            />
          )}
        </div>
      </div>
    );
  }
);

FormElement.displayName = 'formElement';
