import { forwardRef, type ReactNode, useId } from 'react';
import 'react-quill/dist/quill.snow.css';
import 'components/FormElements/FormYamlEditor/FormYamlEditor.scss';
import clsx from 'clsx';
import { YamlEditor, type YamlEditorProps } from 'components/YamlEditor';

interface FormYamlEditor extends YamlEditorProps {
  label?: ReactNode;
  name?: string;
}

export const FormYamlEditor = forwardRef<HTMLDivElement, FormYamlEditor>(
  ({ label, ...props }, ref) => {
    const classname = 'yaml-editor';
    const classes = clsx(classname);
    const id = useId();
    return (
      <div ref={ref} className={classes}>
        {label && (
          <label htmlFor={id} className={`${classname}__label`}>
            {label}
          </label>
        )}
        <div className={`${classname}__wrapper`}>
          <YamlEditor {...props} />
        </div>
      </div>
    );
  }
);
