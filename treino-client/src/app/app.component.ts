import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { BannerComponent } from "./components/home/banner/banner.component";
import { HomeHeaderComponent } from "./components/home/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, BannerComponent, HomeHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'treino-client';
  bannerClosed = false;

  ngOnInit() {
    this.checkBannerStatus();
  }

  checkBannerStatus() {
    this.bannerClosed = localStorage.getItem('home__banner__closed') === 'true';
  }
}
