import { Component, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { BookService as BookService } from '../../core/services/book.service';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../../core/model/book';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  private books$ = new BehaviorSubject<Book[]>([]);
  booksSub$ = this.books$.asObservable();

  bookService = inject(BookService);
  auth = inject(Auth);

  ngOnInit(): void {
    this.bookService.fetchBooks(this.auth.currentUser!.uid).then((res) => {
      const results: Book[] = [];
      res.forEach((snapshot) => {
        console.log(snapshot.data());
        results.push(snapshot.data() as Book);
      });
      this.books$.next(results);
    });
  }
}
