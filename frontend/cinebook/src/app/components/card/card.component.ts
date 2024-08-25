import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() movie: any;
  constructor(
    private router:Router
  ){}

  onBookNow(movieId: string) {
    this.router.navigate(['/ticket', movieId]);
  }
  
}
