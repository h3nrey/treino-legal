import { Component, Input } from '@angular/core';

@Component({
  selector: 'SummarySectionCard',
  imports: [],
  templateUrl: './summary-section-card.component.html',
  styleUrl: './summary-section-card.component.scss',
})
export class SummarySectionCardComponent {
  @Input() summaryText = '';
  @Input() summaryTitle = '';
}
