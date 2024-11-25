import { Component, Input, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Exercise } from '../../utils/interfaces';

@Component({
  selector: 'exercise-card',
  imports: [RouterLink],
  templateUrl: './exercise-card.component.html',
  styleUrl: './exercise-card.component.scss'
})
export class ExerciseCardComponent implements OnInit{
  @Input() exercise?: Exercise;
  tags: string[] = [];

  ngOnInit(){
    this.extractTags();
  }
  
  extractTags() {
    if(!this.exercise) return;
    this.tags.push(this.exercise?.level)
    
  }
}
