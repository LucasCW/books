import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
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
