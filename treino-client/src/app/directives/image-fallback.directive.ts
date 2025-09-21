import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[fallback]',
  standalone: true,
})
export class ImageFallbackDirective {
  @Input() fallback: string = 'assets/DefaultBGCard.svg';

  @HostListener('error', ['$event'])
  handleError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.fallback || 'assets/images/placeholder.png';
    img.onerror = null; // prevent infinite loop
  }
}
