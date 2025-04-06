import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarLinkComponent } from "../sidebar-link/sidebar-link.component";
import { SidebarService } from '../../services/sidebar.service';
import { User } from '../../utils/interfaces';
import { UserService } from '../../services/users.service.ts.service';
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

export class SidebarComponent implements OnInit{
  isOpen: boolean = true;
  expandArrowIcon = "assets/icons/arrowExpand.svg"
  user: User | null = null;

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

  
  constructor(private sidebarService: SidebarService, private readonly userService: UserService) {
    this.sidebarService.sidebarStatus$.subscribe((status) => {
      this.isOpen = status;
    })
  }
  ngOnInit() {
    this.user = this.userService.getUser();
    console.log(this.user);
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  logout() {
    this.userService.logoutUser();
    this.user = null;
    this.sidebarService.toggleSidebar()
  }
}
