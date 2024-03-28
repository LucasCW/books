import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { BooksComponent } from './features/books/books.component';
import { authGuard } from './core/guards/auth.guard.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'books',
    component: BooksComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
];
