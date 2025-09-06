import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CarrousselCardComponent } from '../../components/carroussel-card/carroussel-card.component';
import { TrainingService } from '../../services/training.service';
import { Training } from '../../utils/interfaces';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { SelectComponent } from "../../components/select/select.component";
import {goals} from '../../../data';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingParams } from '../../services/exercises.service';

@Component({
  selector: 'app-training-page',
  imports: [CarrousselCardComponent, CommonModule, SelectComponent],
  templateUrl: './training-page.component.html',
  styleUrl: './training-page.component.scss'
})
export class TrainingPageComponent implements OnInit{
  constructor(private trainingService: TrainingService, protected sidebarService: SidebarService, private router: Router, private route: ActivatedRoute){}
  popularTrainings: Training[] = [];
  PLACEHOLDERIMAGE = "assets/DefaultBGCard.svg";
  goals = goals;
  filters = {
    goal: '',
    muscle: '',
    equipament:''
  }
  defaultParams: TrainingParams = { page: 0, count: 16, muscle: '', equipament: '', goal: ''};
  params: TrainingParams = this.defaultParams;

  ngOnInit(): void {
    this.getFiltersFromRouteParams();
    this.loadTrainings();
  }

  onFiltersChange(updated: Partial<TrainingParams>) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updated,
      queryParamsHandling: 'merge',
      replaceUrl: true
    });

    this.getFiltersFromRouteParams();
    this.loadTrainings();
  }

  getFiltersFromRouteParams() {
    this.route.queryParamMap.subscribe(params => {
      this.params = {
        ...this.defaultParams,
        page: +(params.get("page") ?? 0),
        muscle: params.get("muscle") ?? '',
        equipament: params.get("equipament") ?? '',
        goal: params.get("goal") ?? ''
      }
    });
  }

    
  loadTrainings() {
    this.trainingService.getPopularTrainings(this.params).subscribe((res) => {
      this.popularTrainings = res.data;
    });
  }

}
