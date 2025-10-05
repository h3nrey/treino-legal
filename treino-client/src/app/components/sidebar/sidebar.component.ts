import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { SidebarLinkComponent } from '../sidebar-link/sidebar-link.component';
import { SidebarService } from '../../services/sidebar.service';
import { User } from '../../utils/interfaces';
import { UserService } from '../../services/users.service.ts.service';
import { filter } from 'rxjs';
export interface SiteLink {
  text: string;
  url: string;
  sublinks: { text: string; url: string }[];
  icon: string;
}
@Component({
  selector: 'sidebar',
  imports: [RouterLink, NgStyle, SidebarLinkComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isOpen: boolean = true;
  expandArrowIcon = 'assets/icons/arrowExpand.svg';
  user: User | null = null;
  currRoute = '';

  siteLinks: SiteLink[] = [
    {
      sublinks: [],
      text: 'Início',
      url: '',
      icon: 'home',
    },
    {
      sublinks: [],
      text: 'Exercicios',
      url: 'exercises',
      icon: 'exercise',
    },
    {
      text: 'Treinos',
      url: 'trainings',
      sublinks: [],
      icon: 'dumbell',
    },
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
  ];

  constructor(
    private sidebarService: SidebarService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currRoute = event.urlAfterRedirects;
      });
  }

  isActive(route: string): boolean {
    return this.currRoute == `/${route}`;
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  logout() {
    this.userService.logoutUser();
    this.user = null;
    this.sidebarService.toggleSidebar();
  }
}
