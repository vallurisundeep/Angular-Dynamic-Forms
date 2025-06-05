import { Component } from '@angular/core';
import { FormField } from './../../models/schema.model';
import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
import userFormSchema from './../../data/user-schema.json';
import { OutputComponent } from '../../shared/output/output.component';
@Component({
  selector: 'app-user',
  imports: [DynamicFormComponent, OutputComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  public submittedFormValue: unknown = null;
  public userFormTitle = userFormSchema.title;
  userFormSchema: FormField[] = (userFormSchema as { fields: FormField[] })
    .fields;

  getFormData(formVal: unknown) {
    this.submittedFormValue = formVal;
  }
}
