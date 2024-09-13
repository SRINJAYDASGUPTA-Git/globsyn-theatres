import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MoviesService,
  TicketsService,
  UsersService,
} from '../../services/services';
import { Movie, TicketResponse, UserResponse } from '../../services/models';
import { DatePipe } from '@angular/common';

interface TicketWithMovie {
  ticket: TicketResponse;
  movie: Movie;
}
@Component({
  selector: 'app-user-tickets',
  templateUrl: './user-tickets.component.html',
  styleUrl: './user-tickets.component.css',
})
export class UserTicketsComponent implements OnInit {
  copyUrl(ticketId: string | undefined) {
    if (ticketId) {
      navigator.clipboard.writeText(
        `http://localhost:4200/ticket/${ticketId}`
      );
      alert('URL copied to clipboard');
    }
  }
  cancelTicket(ticketId: string | undefined) {
    if (ticketId) {
      this.ticketService.ticketIdDelete({ id: ticketId }).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
          alert('Error cancelling ticket');
        },
      });
      let currentUser: UserResponse;
      this.usersService.userIdGet({ id: this.userId }).subscribe({
        next: (user) => {
          currentUser = user;
          this.usersService
            .userIdPut({
              id: this.userId,
              body: {
                tickets: this.tickets
                  .filter((ticket) => ticket.ticket._id !== ticketId)
                  .map((ticket) => ticket.ticket._id)
                  .filter((ticketId) => typeof ticketId === 'string'),
                email: currentUser.email,
                name: currentUser.name,
                password: currentUser.password,
                phone: currentUser.phone,
              },
            })
            .subscribe({
              next: (res) => {
                console.log(res);
                alert('Ticket cancelled');
                this.router.navigate(['/']);
              },
              error: (err) => {
                console.error(err);
                alert('Error updating user');
              },
            });
        },
        error: (err) => {
          console.error(err);
          alert('Error fetching user');
        },
      });
    }
  }
  time: string = '';
  time12: string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private ticketService: TicketsService,
    private movieService: MoviesService,
    private datePipe: DatePipe
  ) {}
  userId: string = '';
  tickets: TicketWithMovie[] = [];
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.getTickets();

    console.log(this.tickets);
  }

  getTickets() {
    this.usersService
      .userIdGet({
        id: this.userId,
      })
      .subscribe({
        next: (user) => {
          var ticketIds = user.tickets;
          for (let ticketId of ticketIds) {
            this.ticketService
              .ticketIdGet({
                id: ticketId,
              })
              .subscribe({
                next: (ticket) => {
                  let ticketWithMovie: TicketWithMovie = {
                    ticket: ticket,
                    movie: {
                      _id: '',
                      name: '',
                      director: '',
                      duration: 0,
                      rel_date: '',
                      genre: '',
                      cast: [],
                      imdb_rating: 0,
                      poster: '',
                      language: '',
                    },
                  };
                  this.movieService
                    .movieIdGet({
                      id: ticket.movie,
                    })
                    .subscribe({
                      next: (movie) => {
                        ticketWithMovie.movie = movie;
                      },
                      error: (err) => {
                        console.error(err);
                        alert('Error fetching movie');
                      },
                    });
                  this.tickets.push(ticketWithMovie);
                },
                error: (err) => {
                  console.error(err);
                  alert('Error fetching ticket');
                },
              });
          }
        },
        error: (err) => {
          console.error(err);
          alert('Error fetching user');
        },
      });
  }
}
