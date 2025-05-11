import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CarrousselCardComponent } from '../../components/carroussel-card/carroussel-card.component';

@Component({
  selector: 'app-training-page',
  imports: [CarrousselCardComponent],
  templateUrl: './training-page.component.html',
  styleUrl: './training-page.component.scss'
})
export class TrainingPageComponent implements OnInit{
  trainings = [
    {
      title: "Treino super pesado legal",
      duration: 80,
      type: "strength",
      description: "lorem impsu solor dolet blá blá",
      id: 1
    },
    {
      title: "Treino super pesado legal",
      duration: 80,
      type: "strength",
      description: "lorem impsu solor dolet blá blá",
      id: 1
    },
    {
      title: "Treino super pesado legal",
      duration: 80,
      type: "strength",
      description: "lorem impsu solor dolet blá blá",
      id: 1
    },
    {
      title: "Treino super pesado legal",
      duration: 80,
      type: "strength",
      description: "lorem impsu solor dolet blá blá",
      id: 1
    },
    {
      title: "Treino super pesado legal",
      duration: 80,
      type: "strength",
      description: "lorem impsu solor dolet blá blá",
      id: 1
    }
  ]
  @ViewChild('carouselTrack') carouselTrack!: ElementRef;
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;
  
  private itemWidth = 295;
  protected scrollPosition = 0;
  private scrollSpeed = 0;
  private animationFrameId: number | null = null;
  private isPaused = true;

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.startAutoScroll();
    
    // Pause on hover
    this.carouselContainer.nativeElement.addEventListener('mouseenter', () => {
      this.isPaused = true;
    });
    
    this.carouselContainer.nativeElement.addEventListener('mouseleave', () => {
      this.isPaused = false;
      this.startAutoScroll();
    });
  }

  private startAutoScroll() {
    const scroll = () => {
      if (!this.isPaused) {
        this.scrollPosition += this.scrollSpeed;
        
        // Reset position when halfway through (since we duplicated the items)
        if (this.scrollPosition >= this.carouselTrack.nativeElement.scrollWidth / 2) {
          this.scrollPosition = 0;
        }
        
        this.carouselTrack.nativeElement.style.transform = `translateX(-${this.scrollPosition}px)`;
      }
      
      this.animationFrameId = requestAnimationFrame(scroll);
    };
    
    scroll();
  }

  scrollLeft() {
    this.scrollPosition += this.itemWidth;


    if (this.scrollPosition > 0) {
      this.scrollPosition = -(this.trainings.length * this.itemWidth) + this.itemWidth;
    }
    this.carouselTrack.nativeElement.style.transform = `translateX(-${this.scrollPosition}px)`;
  }

  scrollRight() {
    this.scrollPosition -= this.itemWidth;
    
    // // When we reach the end of duplicates, jump to the original items
    if (this.scrollPosition < -(this.trainings.length * this.itemWidth)) {
      this.scrollPosition = 0;
    }
    
    console.log("scrolling to right")
    console.log(this.scrollPosition);
    this.carouselTrack.nativeElement.style.transform = `translateX(-${this.scrollPosition}px)`;
  }
}
