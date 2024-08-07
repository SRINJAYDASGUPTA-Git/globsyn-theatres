import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/services';
import { UserResponse } from './services/models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  users: UserResponse[] = [];
  constructor (private userService: UsersService) {
  }
  ngOnInit(): void {
    this.getUsers();
  }
  title = 'cinebook';

  getUsers() {
    this.userService.userGet()
    .subscribe(
      (response) => {
        this.users = response;
        console.log(this.users);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
