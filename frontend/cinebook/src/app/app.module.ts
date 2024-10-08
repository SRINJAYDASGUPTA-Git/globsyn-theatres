import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { CardComponent } from './components/card/card.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { RatingComponent } from './components/rating/rating.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserTicketsComponent } from './pages/user-tickets/user-tickets.component';
import { BookTicketComponent } from './pages/book-ticket/book-ticket.component';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    DrawerComponent,
    RegisterComponent,
    CardComponent,
    TicketComponent,
    RatingComponent,
    ProfileComponent,
    UserTicketsComponent,
    BookTicketComponent,
    TimeFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    TimeFormatPipe
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
