import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.css'
})
export class AddMovieComponent implements OnInit {
  movieForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      releaseDate: ['', Validators.required],
      genre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      // Handle form submission
      console.log('Form Data:', this.movieForm.value);
    }
  }
}
