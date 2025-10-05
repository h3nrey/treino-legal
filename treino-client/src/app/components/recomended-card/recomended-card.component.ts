import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface RecommendedCardProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  createdAt?: Date;
  url: string;
}
@Component({
  selector: 'RecomendedCard',
  imports: [RouterLink],
  templateUrl: './recomended-card.component.html',
  styleUrl: './recomended-card.component.scss',
})
export class RecomendedCardComponent {
  @Input() data: RecommendedCardProps | null = null;
}
