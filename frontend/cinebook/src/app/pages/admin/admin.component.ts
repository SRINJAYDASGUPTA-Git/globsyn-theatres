import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService, SchedulesService, ScreensService } from '../../services/services';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  movieScheduleForm!: FormGroup;
  movies: any[] = [];
  screens: any[] = [];

  constructor(
    private fb: FormBuilder,
    private movieService: MoviesService,
    private scheduleService: SchedulesService,
    private screenService: ScreensService
  ) {}

  ngOnInit(): void {
    this.movieScheduleForm = this.fb.group({
      movie: this.fb.group({
        name: ['', Validators.required],
        duration: ['', [Validators.required, Validators.min(1)]],
        genre: ['', Validators.required],
        rel_date: ['', Validators.required],
        cast: ['', Validators.required],
        director: ['', Validators.required],
        imdb_rating: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
        poster: ['', Validators.required],
        language: ['', Validators.required]
      }),
      schedule: this.fb.group({
        date: ['', Validators.required],
        start_time: ['', Validators.required],
        end_time: ['', Validators.required],
        screen: ['', Validators.required]
      })
    });

    this.loadMovies();
    this.loadScreens();
  }
  loadMovies() {
    this.movieService.movieGet().subscribe(data => {
      this.movies = data;
    }, error => {
      console.error('Error fetching movies:', error);
    });
  }
  loadScreens() {
    this.screenService.screenGet().subscribe(data => {
      this.screens = data;
    }, error => {
      console.error('Error fetching screens:', error);
    });
  }
  onSubmit(): void {
    if (this.movieScheduleForm.valid) {
      const formValues = this.movieScheduleForm.value;
      this.movieService.moviePost(formValues.movie).subscribe(movieResponse => {
        const schedule = {
          ...formValues.schedule,
          movie: movieResponse._id
        };
        this.scheduleService.schedulePost(schedule).subscribe(scheduleResponse => {
          console.log('Schedule added successfully:', scheduleResponse);
        }, error => {
          console.error('Error adding schedule:', error);
        });
      }, error => {
        console.error('Error adding movie:', error);
      });
    }
  }
}
