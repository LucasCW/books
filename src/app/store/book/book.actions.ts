import { createAction, props } from '@ngrx/store';
import { Book } from '../../core/model/book';

export const FETCH_BOOKS = '[Books] Fetch Books';
export const LOAD_BOOKS = '[Books] Load Books';
export const ADD_BOOK = '[Books] Add Book';
export const ADD_URL = '[Books] Add URL';
export const UPLOAD_IMG = '[Books] Upload IMG';
export const ADD_BOOK_STORE = '[Books] Add Book Store';
export const REMOVE_BOOK = '[Books] Remove Book';
export const REMOVE_BOOK_STORE = '[Books] Remove Book Store';
export const START_FETCH_BOOKS = '[Books] Start Fetch Books';

export const startFetchBooks = createAction(
  START_FETCH_BOOKS,
  props<{ payload: string }>()
);

export const fetchBooks = createAction(
  FETCH_BOOKS,
  props<{ payload: string }>()
);

export const addBook = createAction(
  ADD_BOOK,
  props<{ payload: { book: Partial<Book>; file: File | string } }>()
);

export const addUrl = createAction(ADD_URL, props<{ payload: Book }>());

export const uploadIMG = createAction(
  UPLOAD_IMG,
  props<{ payload: { file: File; docRefId: string; book: Book } }>()
);

export const addBookStore = createAction(
  ADD_BOOK_STORE,
  props<{ payload: Book }>()
);

export const removeBook = createAction(REMOVE_BOOK, props<{ payload: Book }>());

export const removeBookFromStore = createAction(
  REMOVE_BOOK_STORE,
  props<{ payload: Book }>()
);

export const loadBooks = createAction(LOAD_BOOKS, props<{ payload: Book[] }>());
