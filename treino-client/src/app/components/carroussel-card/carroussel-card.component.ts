import { Component, Input } from '@angular/core';
import { Training } from '../../utils/interfaces';
import { RouterLink } from '@angular/router';

interface cardData {
  title: string;
  id: string;
}

@Component({
  selector: 'CarrousselCard',
  imports: [RouterLink],
  templateUrl: './carroussel-card.component.html',
  styleUrl: './carroussel-card.component.scss',
})
export class CarrousselCardComponent {
  @Input() data!: Training;
}
