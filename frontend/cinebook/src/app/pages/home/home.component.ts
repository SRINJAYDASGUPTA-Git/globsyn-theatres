import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Movie } from '../../services/models';
import { MoviesService } from '../../services/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private movieService: MoviesService
  ) {}

  ngOnInit(): void {
    this.getrecentmovies();
  }
  getrecentmovies(): void {
    this.movieService.movieGet().subscribe((movies) => {
      this.movies = movies;
      console.log(this.movies);
    });
  }

  login() {
    this.router.navigate(['/login']);
  }
}
