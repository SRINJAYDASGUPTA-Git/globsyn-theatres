import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EmailConfirmationService,
  MoviesService,
  SchedulesService,
  ScreensService,
  TicketsService,
  UsersService,
} from '../../services/services';
import { EmailTicketBody, Movie, Schedule, Screen, TicketRequest, BookingDetails } from '../../services/models';
import { DecoderService } from '../../services/decoder/decoder.service';
@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrl: './book-ticket.component.css',
})
export class BookTicketComponent implements OnInit {
  availableDates: string[] = [];
  availableTickets: number = 8;
  seatprice: { [key: string]: number } = {
    "PLATINUM PLUS": 300,
    "PLATINUM": 250,
    "PLATINUM-1": 200,
    "PLATINUM-2": 150,
    "GOLD": 100
  };
  user: any = {
    fullName: '',
    email: '',
    role: '',
    userId: '',
    iat: 0,
    exp: 0,
  };
  ticketOptions: number[] = [];
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
    rel_date: '',
  };

  screen: Screen = {
    description: '',
    _id: '',
    screenNumber: 0,
    seatLayout: [],
    totalSeats: 0,
  };

  schedules: Schedule[] = [
    {
      _id: '',
      movie: '',
      screen: '',
      start_time: '',
      end_time: '',
      date: '',
    },
  ];

  ticketRequest: TicketRequest = {
    date: '',
    movie: '',
    name: '',
    price: 0,
    schedule: '',
    screen: 0,
    seat: [] as string[],
    seatType: '',
    time: '',
    tickets: 0,
  };
  bookingDetails: BookingDetails = {
    bookingDate: '',
    bookingTime: '',
    movieLanguage: '',
    movieName: '',
    moviePosterUrl: '',
    numberOfTickets: 0,
    seatNumbers: [],
    seatType: '',
    ticketId: '',
    username: '',
    ticketPrice: 0,
    totalPrice: 0,
  };
  constructor(
    private route: ActivatedRoute,
    private scheduleService: SchedulesService,
    private movieService: MoviesService,
    private screenService: ScreensService,
    private decoderService: DecoderService,
    private ticketService: TicketsService,
    private userService: UsersService,
    private emailService: EmailConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Decode the token
    this.user = this.decoderService.decodeToken();
    // Retrieve movieId from the route
    this.movieId = this.route.snapshot.paramMap.get('id') || '';
    if (this.movieId) {
      // Fetch the movie using the movieId
      this.movieService.movieIdGet({ id: this.movieId }).subscribe((movie) => {
        this.movie = movie;
      });
      // Fetch the schedules and then the screen
      this.scheduleService.scheduleGet().subscribe((schedules) => {
        this.schedules = schedules.filter(
          (schedule) => schedule.movie === this.movieId
        );
        // console.log(this.schedules);
        // Fetch the screen only if schedules are available
        if (this.schedules.length > 0) {
          this.screenService
            .screenIdGet({ id: this.schedules[0].screen })
            .subscribe({
              next: (screen) => {
                this.screen = screen;
              },
              error: (err) => {
                console.error('Error:', err);
              },
            });
        }
      });
    }

    this.ticketRequest.movie = this.movieId;
    this.ticketRequest.name = this.user.fullName;
    this.ticketRequest.screen = this.screen.screenNumber;

    this.generateAvailableDates();
  }

  generateAvailableDates() {
    const today = new Date();

    for (let i = 0; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i + 1); // Increment date by i days
      this.availableDates.push(this.formatDate(date)); // Format as 'YYYY-MM-DD'
    }
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  onSeatTypeChange(selectedSeatType: string) {
    this.ticketRequest.seatType = selectedSeatType;
    this.ticketRequest.screen = this.screen.screenNumber; // Update the screen number
  }

  onTimeChange(input: string) {
    let schedule: Schedule = {
      _id: '',
      movie: '',
      screen: '',
      start_time: '',
      end_time: '',
      date: '',
    }
    this.scheduleService.scheduleGet().subscribe((schedules) => {
      schedule = schedules.find(
        (schedule) => schedule.start_time === input
      ) || schedule;
      this.ticketRequest.schedule = schedule._id || '';
    });
  }



  updateSeats(tickets: number){
    const selectedSeatType = this.screen.seatLayout.find(
      (seat) => seat.type === this.ticketRequest.seatType
    );
    if (selectedSeatType) {
      selectedSeatType.filled += tickets - this.ticketRequest.seat.length; // Adjust filled seats
      // Update seats array

    }
    this.calculatePrice();
    // console.log(selectedSeatType);
  }
  calculatePrice() {
    const seatType = this.ticketRequest.seatType;
    const ticketCount = this.ticketRequest.tickets;
    const seatPrice = this.seatprice[seatType];
    var price = ticketCount * seatPrice;
    price = price + (price * 0.18);
    this.ticketRequest.price = price;
  }
  bookTicket() {
    for(let i = 1; i <= this.ticketRequest.tickets; i++){
        const selectedSeatType = this.screen.seatLayout.find(
          (seat) => seat.type === this.ticketRequest.seatType
        );
        this.ticketRequest.seat.push(`${selectedSeatType?.startRow}${i}`);
      }
    console.log('Ticket request:', this.ticketRequest);
    this.ticketService.ticketPost(
      {
        body: this.ticketRequest,
      }
    ).subscribe({
      next: (ticket) => {
        console.log('Ticket booked:', ticket);

        this.userService.userIdGet({id: this.user.userId}).subscribe({
          next: (user) => {
            user.tickets?.push(ticket._id || '');
            this.userService.userIdPut({id: this.user.userId, body: user}).subscribe({
              next: (new_user) => {
                console.log('User updated:', new_user);
              },
              error: (err) => {
                console.error('Error:', err);
              },
            });
          },
          error: (err) => {
            console.error('Error:', err);
          },
        });

        this.bookingDetails = {
          bookingDate: this.ticketRequest.date,
          bookingTime: this.ticketRequest.time,
          movieLanguage: this.movie.language,
          movieName: this.movie.name,
          moviePosterUrl: this.movie.poster,
          numberOfTickets: this.ticketRequest.tickets,
          seatNumbers: this.ticketRequest.seat,
          seatType: this.ticketRequest.seatType,
          ticketId: ticket._id || '',
          username: this.user.fullName,
          ticketPrice: this.ticketRequest.price,
          totalPrice: this.ticketRequest.price + 200.0,

        };
        let emailTicketBody: EmailTicketBody = {
          email: this.user.email,
          bookingDetails: this.bookingDetails,
        };
        console.log('Email ticket body:', emailTicketBody);
        this.emailService.emailSendEmailPost({ body: emailTicketBody }).subscribe({
          next: (response) => {
            console.log('Email sent:', response);
          },
          error: (err) => {
            console.error('Error:', err);
          },
        });
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }
}
