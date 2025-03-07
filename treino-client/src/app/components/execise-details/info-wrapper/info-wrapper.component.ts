import { Component, Input } from '@angular/core';

interface IInfo {
  primaryMuscle: string,
  otherMuscles: string[],
  experienceLevel: string,
  grip?: string,
  equipament: string,
  usedMusclesImageUrl?: string
}

@Component({
  selector: 'app-info-wrapper',
  imports: [],
  templateUrl: './info-wrapper.component.html',
  styleUrl: './info-wrapper.component.scss'
})
export class InfoWrapperComponent {
  @Input() info: IInfo | null = null;
  imagePlaceholder = "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2024/02/Muscles-worked-in-dumbbell-curl-exercise-1024x1024.png?resize=700%2C700&ssl=1"
}
