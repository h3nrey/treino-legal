import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Muscle } from '../../../utils/interfaces';

@Component({
  selector: 'app-muscle-card',
  imports: [RouterLink],
  templateUrl: './muscle-card.component.html',
  styleUrl: './muscle-card.component.scss',
})
export class MuscleCardComponent {
  @Input() muscle: { id: number; name: string } = { id: 0, name: '' };
  @Input() queryParams: { equipament?: string; muscle?: string; page?: number } = { page: 0 };
  @Input() sectionType: string = '';

  PLACEHOLDERIMAGE = 'assets/DefaultBGCard.svg';
}
