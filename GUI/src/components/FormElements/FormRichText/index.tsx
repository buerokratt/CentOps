import type { FC } from 'react';
import ReactQuill, { type ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './FormRichText.scss';

interface FormRichTextProps extends ReactQuillProps {
  readonly defaultValue?: string;
  onChange(value: string | null): void;
}

export const FormRichText: FC<FormRichTextProps> = ({
  defaultValue,
  onChange,
  ...rest
}) => {
  const modules = {
    toolbar: [
      ['italic', 'bold', 'underline', 'strike', 'blockquote'],
      [
        { align: '' },
        { align: 'center' },
        { align: 'right' },
        { align: 'justify' },
      ],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ],
  };

  return (
    <>
      <ReactQuill
        defaultValue={defaultValue}
        onChange={(value) => {
          value = value === '<p><br></p>' ? '' : value;
          onChange(value.length === 0 ? null : value);
        }}
        modules={modules}
        style={{ width: '100%' }}
        {...rest}
      />
    </>
  );
};

export default FormRichText;
