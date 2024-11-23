import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-exercises',
  imports: [],
  templateUrl: './list-exercises.component.html',
  styleUrl: './list-exercises.component.scss'
})
export class ListExercisesComponent {
  constructor(private route: ActivatedRoute) {}

  muscleGroupId : string | null = null;

  ngOnInit(): void {
    this.muscleGroupId = this.route.snapshot.paramMap.get("musclegroup");
    console.log(this.muscleGroupId);
  }
}
