import { Component,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchedulesService } from '../../services/services';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit {
  movieId: string | undefined;
  schedule: any;
  constructor(
    private route: ActivatedRoute,
    private scheduleService: SchedulesService
  ) {}

  ngOnInit(): void {
    // Retrieve movieId from the route
    this.movieId = this.route.snapshot.paramMap.get('movieId') || '';

    if (this.movieId) {
      // Fetch the schedule using the movieId
      this.scheduleService.scheduleIdGet({ id: this.movieId }).subscribe(schedule => {
        this.schedule = schedule;
      });
    }
  }
}
