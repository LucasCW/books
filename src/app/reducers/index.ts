import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import * as fromBooks from '../store/book/book.reducer';

export interface State {
  book: fromBooks.State;
}

export const reducers: ActionReducerMap<State> = {
  book: fromBooks.reducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
