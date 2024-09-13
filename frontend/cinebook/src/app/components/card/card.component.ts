import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../services/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() movie: Movie= {
    _id: '',
    name: '',
    director: '',
    duration: 0,
    rel_date: '',
    genre: '',
    cast: [],
    imdb_rating: 0,
    poster: '',
    language: ''
  };
  constructor(
    private router:Router
  ){}

  onBookNow(movieId: string) {
    this.router.navigate(['/ticket', movieId]);
  }

}
