import { Component, Input } from '@angular/core';

@Component({
  selector: 'DetailsRow',
  imports: [],
  templateUrl: './details-row.component.html',
  styleUrl: './details-row.component.scss',
})
export class DetailsRowComponent {
  @Input() value!: string | string[];
  @Input() caption!: string;

  isString() {
    if (typeof this.value === 'string' || this.value instanceof String) return true;
    return false;
  }

  makeLower(value: string | string[]) {
    if (this.isString()) return value.toLocaleString().toLowerCase();
    return value;
  }
}
