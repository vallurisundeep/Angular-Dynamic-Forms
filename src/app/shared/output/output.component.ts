import { Component, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-output',
  imports: [JsonPipe],
  templateUrl: './output.component.html',
  styleUrl: './output.component.scss',
})
export class OutputComponent {
  @Input() submittedFormValue: unknown = null;
}
