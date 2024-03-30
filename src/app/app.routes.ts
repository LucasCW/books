import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { BooksComponent } from './features/books/books.component';
import { authenticationRequired } from './core/guards/authenticationRequired.guard';
import { isAuthenticatedGuard } from './core/guards/isAuthenticated.guard';
import { AddBookComponent } from './features/add-book/add-book.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [isAuthenticatedGuard],
  },
  {
    path: 'books',
    component: BooksComponent,
    canActivate: [authenticationRequired],
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'addbook',
    component: AddBookComponent,
    canActivate: [authenticationRequired],
  },
];
