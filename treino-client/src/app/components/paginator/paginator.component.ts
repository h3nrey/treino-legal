import { NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paginator',
  imports: [NgStyle],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent implements OnInit {
  @Input() totalCount: number = 0;
  @Input() cardsCount: number = 16;
  @Input() route: ActivatedRoute = new ActivatedRoute();
  @Input() router: Router = new Router();
  @Input() page: number = 0;
  items: number[] = [];

  ngOnInit() {
    this.items = Array.from({ length: this.totalCount / 16 }, (_, i) => i + 1);
  }

  changePage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page - 1 },
      queryParamsHandling: 'merge'
    })
  }
}
