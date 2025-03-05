import { NgClass, NgStyle } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paginator',
  imports: [NgStyle, NgClass],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() totalCount: number = 0;
  @Input() cardsCount: number = 16;
  @Input() route: ActivatedRoute = new ActivatedRoute();
  @Input() router: Router = new Router();
  @Input() page: number = 0;
  items: number[] = [];

  ngOnInit() {
    this.setPages();
  }

  ngOnChanges() {
    this.setPages();
  }
    

  setPages() {
    const pages = Math.ceil(this.totalCount / this.cardsCount);
    this.items = Array.from({ length: pages }, (_, i) => i + 1);
  }
  

  changePage(page: number) {
    if(page < 0 || page >= this.items.length) return;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge'
    })
  }
}
