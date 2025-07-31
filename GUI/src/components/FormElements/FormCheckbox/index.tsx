import {
  type ChangeEventHandler,
  forwardRef,
  type ReactNode,
  useId,
} from 'react';

import './FormCheckbox.scss';

type FormCheckboxType = {
  label?: ReactNode;
  value?: string;
  name?: string;
  hideLabel?: boolean;
  checked?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxType>(
  ({ label, value, name, hideLabel, checked, onChange }, ref) => {
    const uid = useId();

    return (
      <div className="checkbox">
        {label && !hideLabel && (
          <label className="checkbox__label">{label}</label>
        )}
        <div className="checkbox__item">
          <input
            ref={ref}
            type="checkbox"
            name={name}
            id={uid}
            value={value}
            checked={checked}
            onChange={onChange}
          />
          <label htmlFor={uid} />
        </div>
      </div>
    );
  }
);
