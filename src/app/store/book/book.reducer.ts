import { createReducer, on } from '@ngrx/store';
import { Book } from '../../core/model/book';
import { addBookStore, loadBooks, removeBookFromStore } from './book.actions';

export interface State {
  books: Book[];
}

const initState: State = {
  books: [],
};

export const reducer = createReducer(
  initState,
  on(loadBooks, (state, action) => {
    return {
      ...state,
      books: action.payload,
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
    };
  })
);
