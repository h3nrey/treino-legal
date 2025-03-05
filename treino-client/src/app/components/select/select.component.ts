import { NgClass } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'filter-select',
  imports: [NgClass],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  constructor(private elRef: ElementRef){}
  @Input() placeholderText: string = 'Grupo muscular';
  @Input() options: string[] = []
  @Output() changeOptionEvent = new EventEmitter();

  currentOption = -1;
  arrowIcon = 'assets/icons/arrowDown.svg'
  checkIcon = 'assets/icons/check.svg'

  optionsOpened = false;

  selectOption(option: number) {
    this.currentOption = option;
    this.changeOptionEvent.emit(this.options[option]);
  }

  toggleSelect() {
    this.optionsOpened = !this.optionsOpened;
  }

  @HostListener('document:click', ['$event'])
  closeSelect(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.optionsOpened = false;
    }
  }
}
