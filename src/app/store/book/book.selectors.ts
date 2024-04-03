import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, adapter } from './book.reducer';

export const selectBookFeature = createFeatureSelector<State>('book');

export const selectBooks = createSelector(
  selectBookFeature,
  adapter.getSelectors().selectAll
);

export const isLoading = createSelector(
  selectBookFeature,
  (state: State) => state.isLoading
);
