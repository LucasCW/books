import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { Book } from '../../core/model/book';
import { State } from '../../reducers';
import { fetchBooks, removeBook } from '../../store/book/book.actions';
import { selectBooks } from '../../store/book/book.selectors';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  auth = inject(Auth);

  store = inject(Store<State>);

  booksSub$ = this.store.select(selectBooks);

  ngOnInit(): void {
    this.store.dispatch(fetchBooks({ payload: this.auth.currentUser!.uid }));
  }

  onDelete(book: Book) {
    this.store.dispatch(removeBook({ payload: book }));
  }
}
