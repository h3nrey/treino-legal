import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarLinkComponent } from "../sidebar-link/sidebar-link.component";
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
      sublinks: [
        {
          url: 'peitoral',
          text: 'Peitoral'
        },
        {
          url: 'biceps',
          text: 'Biceps'
        },
        {
          url: 'triceps',
          text: 'Triceps'
        },
        {
          url: 'costas',
          text: 'Costas'
        },
        {
          url: 'quads',
          text: 'Quadriceps'
        },
        {
          url: 'hamstring',
          text: 'Posterior'
        },
      ],
      text: 'Exercicios',
      url: 'exercises'
    },
    {
      text: "Treinos",
      url: 'trainings',
      sublinks: []
    },
    {
      text: "Rotinas",
      url: 'routines',
      sublinks: []
    },
    {
      text: "Ferramentas",
      url: 'tools',
      sublinks: [
        {
          url: 'imc-calculator',
          text: "Calculadora IMC"
        }
      ]
    },
    {
      text: "Artigos",
      url: 'articles',
      sublinks: []
    }
  ]
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
