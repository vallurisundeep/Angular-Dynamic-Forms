import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  FormField,
  FormFieldOption,
  FormValidation,
} from '../../models/schema.model';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  imports: [ReactiveFormsModule],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() schema: FormField[] = [];
  @Input() formTitle = '';
  @Output() formSubmitted = new EventEmitter<
    Record<string, string | number | boolean | string[] | number[]>
  >();

  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({});
  visibleFields: FormField[] = [];
  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['schema']) {
      this.buildForm();
    }
  }

  buildForm(): void {
    this.form = this.fb.group({});

    this.schema.forEach((field) => {
      let validations: FormValidation[] = field.validations || [];

      if ((field as any).required) {
        if (!validations.some((v) => v.name === 'required')) {
          validations = [
            ...validations,
            { name: 'required', message: `${field.label} is required` },
          ];
        }
      }

      if ((field as any).validation) {
        const v = (field as any).validation;
        if (
          !validations.some(
            (val) => val.name === 'pattern' && val.value === v.pattern
          )
        ) {
          validations = [
            ...validations,
            { name: 'pattern', value: v.pattern, message: v.message },
          ];
        }
      }

      let options: FormFieldOption[] | undefined = field.options;
      if (Array.isArray(options) && typeof options[0] === 'string') {
        options = (options as unknown as string[]).map((opt) => ({
          key: opt.toLowerCase(),
          value: opt,
        }));
      }

      const validators =
        validations
          ?.map((rule) => {
            switch (rule.name) {
              case 'required':
                return Validators.required;
              case 'minLength':
                return Validators.minLength(
                  typeof rule.value === 'number' ? rule.value : 0
                );
              case 'maxLength':
                return Validators.maxLength(
                  typeof rule.value === 'number' ? rule.value : 0
                );
              case 'pattern':
                return Validators.pattern(
                  typeof rule.value === 'string' ? rule.value : ''
                );
              default:
                return null;
            }
          })
          .filter(Boolean) || [];

      const control = new FormControl(
        {
          value: field.value || '',
          disabled: field.disabled ?? false,
        } as any,
        validators as any
      );
      this.form.addControl(field.name, control);

      field.options = options;
      field.validations = validations;
    });

    this.updateVisibleFields();

    this.form.valueChanges.subscribe(() => {
      this.updateVisibleFields();
    });
  }

  updateVisibleFields(): void {
    this.visibleFields = this.schema.filter((field) => {
      if (field.hidden) return false;
      if (!field.conditional) return true;
      const dependentValue = this.form.get(field.conditional.dependsOn)?.value;
      return dependentValue === field.conditional.value;
    });
  }

  getControl(name: string) {
    return this.form.get(name);
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
    }
  }
}
