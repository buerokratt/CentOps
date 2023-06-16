
export interface DynamicFormConfig {
  title: string;
  vaildatorSource: string;
  fields: Field[];
  submitUrl?: string;
}

export interface Field {
  id: string;
  label: string;
  type: 'text' | 'checkbox' | 'select' | 'email' | 'number' | 'date' | 'time';
  options?: { value: string; label: string }[];
  vaildationType?: string;
}
