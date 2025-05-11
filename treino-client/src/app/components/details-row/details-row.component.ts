import { Component, Input } from '@angular/core';

@Component({
  selector: 'DetailsRow',
  imports: [],
  templateUrl: './details-row.component.html',
  styleUrl: './details-row.component.scss'
})
export class DetailsRowComponent {
  @Input() value!: string;
  @Input() caption!: string;
}
