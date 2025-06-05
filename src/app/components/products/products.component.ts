import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
import productFormSchema from '../../data/product-schema.json';
import { FormField } from './../../models/schema.model';
import { OutputComponent } from '../../shared/output/output.component';
@Component({
  selector: 'app-products',
  imports: [DynamicFormComponent, OutputComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  public productFormTitle = productFormSchema.title;
  public submittedFormValue: unknown = null;

  productFormSchema: FormField[] = (
    productFormSchema as { fields: FormField[] }
  ).fields;
  getFormData(formVal: unknown) {
    this.submittedFormValue = formVal;
  }
}
