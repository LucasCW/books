import { createReducer, on } from '@ngrx/store';
import { Book } from '../../core/model/book';
import {
  addBook,
  addBookStore,
  loadBooks,
  removeBookFromStore,
  startFetchBooks,
} from './book.actions';

export interface State {
  isLoading: boolean;
  books: Book[];
}

const initState: State = {
  isLoading: false,
  books: [],
};

export const reducer = createReducer(
  initState,
  on(startFetchBooks, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(addBook, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(loadBooks, (state, action) => {
    return {
      ...state,
      books: action.payload,
      isLoading: false,
    };
  }),
  on(removeBookFromStore, (state, action) => {
    return {
      ...state,
      books: [...state.books.filter((book) => action.payload.id! != book.id!)],
    };
  }),
  on(addBookStore, (state, action) => {
    return {
      ...state,
      books: [...state.books, { ...action.payload }],
      isLoading: false,
    };
  })
);
