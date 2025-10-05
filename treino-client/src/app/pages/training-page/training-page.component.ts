import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CarrousselCardComponent } from '../../components/carroussel-card/carroussel-card.component';
import { TrainingService } from '../../services/training.service';
import { Training } from '../../utils/interfaces';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { SelectComponent } from '../../components/select/select.component';
import { goals, equipaments, muscles } from '../../../data';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingParams } from '../../services/exercises.service';
import { CleanFiltersButtonComponent } from '../../components/clean-filters-button/clean-filters-button.component';
import { OrderBySelectorComponent } from '../../components/order-by-selector/order-by-selector.component';
import { TrainingCardComponent } from '../../components/training-card/training-card.component';

@Component({
  selector: 'app-training-page',
  imports: [
    CarrousselCardComponent,
    CommonModule,
    SelectComponent,
    CleanFiltersButtonComponent,
    OrderBySelectorComponent,
    TrainingCardComponent,
  ],
  templateUrl: './training-page.component.html',
  styleUrl: './training-page.component.scss',
})
export class TrainingPageComponent implements OnInit {
  constructor(
    private trainingService: TrainingService,
    protected sidebarService: SidebarService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  popularTrainings: Training[] = [];
  PLACEHOLDERIMAGE = 'assets/DefaultBGCard.svg';

  goalsOptions = goals;
  equipamentsOptions = equipaments;
  musclesOptions = muscles;
  filters = {
    goal: '',
    muscle: '',
    equipament: '',
  };
  defaultParams: TrainingParams = {
    page: 0,
    count: 16,
    muscle: '',
    equipament: '',
    goal: '',
    sortBy: 'createdAt',
  };
  params: TrainingParams = this.defaultParams;

  ngOnInit(): void {
    this.subscribeToRouteParams();
    this.loadTrainings();
  }

  clearFilters() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { goal: null, muscle: null, equipament: null, page: null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  subscribeToRouteParams() {
    this.route.queryParamMap.subscribe((params) => {
      this.params = {
        page: +(params.get('page') ?? 0),
        count: this.params.count,
        sortBy: params.get('sortBy') ?? 'createdAt',
        muscle: params.get('muscle') ?? '',
        equipament: params.get('equipament') ?? '',
        goal: params.get('goal') ?? '',
      };

      this.loadTrainings();
    });
  }

  onFiltersChange(updated: Partial<TrainingParams>) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updated,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });

    this.filters = { ...this.filters, ...updated };
  }

  loadTrainings() {
    console.log(this.params);
    this.trainingService.getPopularTrainings(this.params).subscribe((res) => {
      this.popularTrainings = res.data;
    });
  }
}
