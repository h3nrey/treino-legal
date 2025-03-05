import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-home-section',
  imports: [RouterLink, NgClass, CommonModule],
  templateUrl: './home-section.component.html',
  styleUrl: './home-section.component.scss'
})
export class HomeSectionComponent {
  constructor(protected sidebarService: SidebarService){}
  @Input() sectionLink: string = '';
  @Input() sectionTitle: string = '';
  arrowRight = "assets/icons/arrowRight.svg"
}
