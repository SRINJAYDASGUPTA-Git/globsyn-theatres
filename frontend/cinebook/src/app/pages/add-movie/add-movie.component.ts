import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from '../../services/services';
import { Movie } from '../../services/models';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  movieForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private movieService: MoviesService) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      releaseDate: ['', Validators.required],
      genre: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      cast: ['', Validators.required],
      director: ['', Validators.required],
      imdb_rating: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      poster: ['', Validators.required],
      language: ['', Validators.required]
    });
  }



  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const formData = this.movieForm.value;

      // Convert cast (comma-separated string) to an array
      formData.cast = formData.cast.split(',').map((castMember: string) => castMember.trim());
      let reqBody = formData as Movie;
      console.log('Form Data:', reqBody);
      // Handle form submission logic here

      this.movieService.moviePost({
        body: reqBody
      }).subscribe({
        next: (data) => {
          console.log('Movie added successfully:', data);
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.error('Error adding movie:', error);
        }
      })
    }
  }
}
