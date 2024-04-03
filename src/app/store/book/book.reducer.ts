import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Book } from '../../core/model/book';
import {
  addBook,
  addBookStore,
  loadBooks,
  removeBookFromStore,
  startFetchBooks,
} from './book.actions';

export interface State extends EntityState<Book> {
  isLoading: boolean;
}

export const adapter = createEntityAdapter<Book>();

const initialState: State = adapter.getInitialState({ isLoading: false });

export const reducer = createReducer(
  initialState,
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
    return adapter.setAll(action.payload, { ...state, isLoading: false });
  }),
  on(removeBookFromStore, (state, action) => {
    return adapter.removeOne(action.payload.id, state);
  }),
  on(addBookStore, (state, action) => {
    return adapter.addOne(action.payload, { ...state, isLoading: false });
  })
);
