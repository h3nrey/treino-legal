import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon, NgIconComponent } from '@ng-icons/core';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'OrderBySelector',
  imports: [CommonModule, NgIconComponent, SelectComponent],
  templateUrl: './order-by-selector.component.html',
  styleUrl: './order-by-selector.component.scss',
})
export class OrderBySelectorComponent {
  @Input() options = [
    { label: 'recentes', value: 'createdAt' },
    { label: 'popularidade', value: 'popularity' },
  ];
  @Output() changeOptionEvent = new EventEmitter<string>();
  currOption = this.options[0].value;

  selectOption(option: string) {
    this.currOption = option;
    this.changeOptionEvent.emit(option);
  }
}
