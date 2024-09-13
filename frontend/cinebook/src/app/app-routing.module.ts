import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { authGuard } from './services/guard/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserTicketsComponent } from './pages/user-tickets/user-tickets.component';
import { BookTicketComponent } from './pages/book-ticket/book-ticket.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'book-ticket/:id',
    component: BookTicketComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: "profile/tickets/:id",
    component: UserTicketsComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
