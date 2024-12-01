import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteLink } from '../sidebar/sidebar.component';

@Component({
  selector: 'sidebar-link',
  imports: [RouterLink, NgStyle],
  templateUrl: './sidebar-link.component.html',
  styleUrl: './sidebar-link.component.scss'
})
export class SidebarLinkComponent {
  @Input() isOpen: boolean = false;
  @Input() link: SiteLink | null = null;
  isContentOpen: boolean = false;

  toggleSublinks() {
    this.isContentOpen = !this.isContentOpen;
  }
}
