import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'books';
  isAuthenticated = false;

  constructor(protected auth: Auth) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      this.isAuthenticated = !!user;
    });
  }
}
