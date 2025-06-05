export interface FormFieldOption {
  key: string;
  value: string;
}

export interface FormValidation {
  name: 'required' | 'minLength' | 'maxLength' | 'pattern';
  value?: number | string;
  message: string;
}

export interface ConditionalDisplay {
  dependsOn: string;
  value: number | string;
}

export interface FormField {
  type: 'text' | 'textarea' | 'date' | 'dropdown' | 'multiselect' | 'checkbox';
  name: string;
  label: string;
  value?: number | string | boolean | string[] | number[];
  options?: FormFieldOption[];
  validations?: FormValidation[];
  readonly?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  placeholder?: string;
  conditional?: ConditionalDisplay;
}
