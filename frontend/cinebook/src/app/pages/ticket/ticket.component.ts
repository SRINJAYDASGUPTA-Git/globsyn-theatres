import { Component,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService, SchedulesService, ScreensService } from '../../services/services';
import { Movie, Schedule, Screen } from '../../services/models';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit {
  movieId: string | undefined;
  movie: Movie = {
    cast: [],
    director: '',
    duration: 0,
    genre: '',
    imdb_rating: 0,
    language: '',
    name: '',
    poster: '',
    rel_date: ''
  }

  screen:Screen = {
    description: '',
    _id: '',
    screenNumber: 0,
    seatLayout: [],
    totalSeats: 0
  }

  schedules: Schedule[] =[
    {
      _id: '',
      movie: '',
      screen: '',
      start_time: '',
      end_time: '',
      date: '',
    }
  ]
  constructor(
    private route: ActivatedRoute,
    private scheduleService: SchedulesService,
    private movieService: MoviesService,
    private screenService:ScreensService
  ) {}

  ngOnInit(): void {
    // Retrieve movieId from the route
    this.movieId = this.route.snapshot.paramMap.get('id') || '';
    if (this.movieId) {
      // Fetch the schedule using the movieId
      this.movieService.movieIdGet({id: this.movieId}).subscribe(movie => {
        this.movie = movie;
      });
      this.scheduleService.scheduleGet().subscribe(schedules => {
        console.log(schedules);
        this.schedules = schedules.filter(schedule => schedule.movie === this.movieId);
      });
    }
    this.screenService.screenIdGet({ id: this.schedules[0].screen }).subscribe({
      next: (screen) => {
        console.log(screen); // Ensure this is not being treated as an array
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}
