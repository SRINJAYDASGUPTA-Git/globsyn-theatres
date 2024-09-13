import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/services';
import { DecoderService } from '../../services/decoder/decoder.service';
import { UserResponse } from '../../services/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  menuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  currentUser: UserResponse = {
    email: '',
    name: '',
    password: '',
    phone: '',
    tickets: [],
  };

  constructor(
    private router: Router,
    private usersService: UsersService,
    private decoderService: DecoderService
  ) {}
  ngOnInit(): void {
    const id = this.decoderService.decodeToken().userId;
    this.usersService
      .userIdGet({
        id: id,
      })
      .subscribe((user) => {
        this.currentUser = user;
      });

      if(this.isAdmin && this.router.url === '/')
      {
        this.router.navigate(['/admin']);
      }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  get isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  get isAdmin() {
    return (
      this.isLoggedIn && this.decoderService.decodeToken().role === 'admin'
    );
  }
}
