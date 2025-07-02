import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef, useId } from 'react';
import clsx from 'clsx';
import { MdOutlinePalette } from 'react-icons/md';
import { renderToString } from 'react-dom/server';

import { Icon } from 'components';
import './FormInput.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
  name: string;
  defaultValue?: string;
  hideLabel?: boolean;
  colorInput?: boolean;
};

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, name, defaultValue, disabled, hideLabel, colorInput, ...rest },
    ref
  ) => {
    const id = useId();

    const inputClasses = clsx('input', disabled && 'input--disabled');

    return (
      <div className={inputClasses}>
        {label && !hideLabel && (
          <label htmlFor={id} className="input__label">
            {label}
          </label>
        )}
        <div className="input__wrapper">
          <input
            className={inputClasses}
            name={name}
            value={defaultValue}
            id={id}
            ref={ref}
            aria-label={renderToString(label)}
            pattern={colorInput ? '^#([a-fA-F0-9]{3}){1,2}$' : undefined}
            {...rest}
          />
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

FormInput.displayName = 'formInput';
