import { NgClass } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'filter-select',
  imports: [NgClass],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent implements OnInit{
  constructor(private elRef: ElementRef, private searchService: SearchService){}
  @Input() placeholderText: string = 'Grupo muscular';
  @Input() options: string[] = []
  @Output() changeOptionEvent = new EventEmitter();

  @Input() currentOption!: string;
  currentOptionIndex =0;
  arrowIcon = 'assets/icons/arrowDown.svg'
  checkIcon = 'assets/icons/check.svg'

  optionsOpened = false;

  ngOnInit() {
  }

  selectOption(option: number) {
    this.changeOptionEvent.emit(this.options[option]);
  }

  displaySelectText() {
    const index = this.options.findIndex((el) => el == this.currentOption)
    return this.currentOption == '' ? this.placeholderText : this.currentOption;
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
