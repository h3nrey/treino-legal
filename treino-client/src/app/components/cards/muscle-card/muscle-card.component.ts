import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Muscle } from '../../../utils/interfaces';

@Component({
  selector: 'app-muscle-card',
  imports: [RouterLink],
  templateUrl: './muscle-card.component.html',
  styleUrl: './muscle-card.component.scss'
})
export class MuscleCardComponent {
  @Input() muscle: Muscle = { id: 0, name: '' };

  PLACEHOLDERIMAGE = "assets/DefaultBGCard.svg";
}
