import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './book.reducer';

export const selectBookFeature = createFeatureSelector<State>('book');

export const selectBooks = createSelector(
  selectBookFeature,
  (state: State) => state.books
);

export const isLoading = createSelector(
  selectBookFeature,
  (state: State) => state.isLoading
);
