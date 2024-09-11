import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/services';
import { DecoderService } from '../../services/decoder/decoder.service';
import { UserResponse } from '../../services/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
updateUser() {
throw new Error('Method not implemented.');
}
  userId: string = '';
  currentUser: UserResponse = {
    email: '',
    name: '',
    password: '',
    phone: '',
    tickets: [],
  };
  constructor(private router: Router, private usersService: UsersService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.usersService.userIdGet({
      id: this.userId,
    }).subscribe((user) => {
      this.currentUser = user;
      console.log(this.currentUser);
    });

  }
}
