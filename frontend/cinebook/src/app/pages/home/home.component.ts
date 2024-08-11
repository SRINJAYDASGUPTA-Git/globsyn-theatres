import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Movie } from '../../services/models';
import { movieGet } from '../../services/fn/movies/movie-get';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  movies:Movie[]=[];

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit():void{
    this.getrecentmovies();
  }
  getrecentmovies():void{
    const rootUrl = 'http://localhost:5000';
  
  movieGet(this.http, rootUrl).subscribe((response) => {
    this.movies = response.body || []; 
  })};

  login(){
    this.router.navigate(['/login']);
  }
}
