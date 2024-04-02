import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, catchError, from, map, switchMap, tap } from 'rxjs';
import { Book } from '../../core/model/book';
import { BookService } from '../../core/services/book.service';
import {
  addBook,
  addBookStore,
  addUrl,
  fetchBooks,
  loadBooks,
  removeBook,
  removeBookFromStore,
  uploadIMG,
} from './book.actions';

export const fetchEffect = createEffect(
  (action$ = inject(Actions), bookService = inject(BookService)) => {
    return action$.pipe(
      ofType(fetchBooks),
      switchMap((props) => {
        return from(bookService.fetchBooks(props.payload)).pipe(
          map((res) => {
            const results: Book[] = [];
            res.forEach((snapshot) => {
              results.push({ ...snapshot.data(), id: snapshot.id } as Book);
            });
            return loadBooks({ payload: results });
          })
        );
      })
    );
  },
  { functional: true }
);

export const removeBookEffect = createEffect(
  (action$ = inject(Actions), bookService = inject(BookService)) => {
    return action$.pipe(
      ofType(removeBook),
      switchMap((props) => {
        return from(bookService.removeBook(props.payload)).pipe(
          map(() => {
            return removeBookFromStore({ payload: props.payload });
          })
        );
      })
    );
  },
  { functional: true }
);

export const removeFileEffect = createEffect(
  (action$ = inject(Actions), bookService = inject(BookService)) => {
    return action$.pipe(
      ofType(removeBook),
      switchMap((props) => {
        return from(
          bookService.removeFileFromFireStorage(props.payload.id!)
        ).pipe(
          catchError((err, caught) => {
            console.log('err', err);
            console.log(caught);
            return EMPTY;
            // return caught;
          })
        );
      })
    );
  },
  { dispatch: false, functional: true }
);

export const addBookEffect = createEffect(
  (action$ = inject(Actions), bookService = inject(BookService)) => {
    return action$.pipe(
      ofType(addBook),
      switchMap((props) => {
        return from(bookService.addBook(props.payload.book)).pipe(
          map((res) => {
            if (typeof props.payload.file === 'string') {
              return addUrl({
                payload: {
                  ...props.payload.book,
                  id: res.id,
                  url: props.payload.file,
                } as Book,
              });
            } else {
              return uploadIMG({
                payload: {
                  file: props.payload.file,
                  book: { ...props.payload.book, id: res.id } as Book,
                  docRefId: res.id,
                },
              });
            }
          })
        );
      })
    );
  },
  { functional: true }
);

export const addUrlEffect = createEffect(
  (action$ = inject(Actions), bookService = inject(BookService)) => {
    return action$.pipe(
      ofType(addUrl),
      switchMap((props) => {
        return from(
          bookService.addUrl(props.payload.id!, props.payload.url!)
        ).pipe(
          map(() => {
            return addBookStore({ payload: { ...props.payload } });
          })
        );
      })
    );
  },
  { functional: true }
);

export const uploadIMGEffect = createEffect(
  (action$ = inject(Actions), bookService = inject(BookService)) => {
    return action$.pipe(
      ofType(uploadIMG),
      switchMap((props) => {
        return from(
          bookService.uploadToFireStorage(
            props.payload.docRefId,
            props.payload.file
          )
        ).pipe(
          map((res) => {
            return addUrl({
              payload: {
                ...props.payload.book,
                url: res,
              } as Book,
            });
          }),
          catchError((err, caught) => {
            return caught;
          })
        );
      })
    );
  },
  { functional: true }
);
