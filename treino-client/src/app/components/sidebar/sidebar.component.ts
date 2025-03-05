import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarLinkComponent } from "../sidebar-link/sidebar-link.component";
import { SidebarService } from '../../services/sidebar.service';
export interface SiteLink {
  text: string,
  url: string,
  sublinks: { text: string, url: string }[]
}
@Component({
  selector: 'sidebar',
  imports: [RouterLink, NgStyle, SidebarLinkComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
  isOpen: boolean = true;
  expandArrowIcon = "assets/icons/arrowExpand.svg"

  siteLinks: SiteLink[] = [
    {
      sublinks: [],
      text: 'Exercicios',
      url: 'exercises'
    },
    // {
    //   text: "Treinos",
    //   url: 'trainings',
    //   sublinks: []
    // },
    // {
    //   text: "Rotinas",
    //   url: 'routines',
    //   sublinks: []
    // },
    // {
    //   text: "Ferramentas",
    //   url: 'tools',
    //   sublinks: [
    //     {
    //       url: 'imc-calculator',
    //       text: "Calculadora IMC"
    //     }
    //   ]
    // },
    // {
    //   text: "Artigos",
    //   url: 'articles',
    //   sublinks: []
    // }
  ]

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.sidebarStatus$.subscribe((status) => {
      this.isOpen = status;
    })
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
