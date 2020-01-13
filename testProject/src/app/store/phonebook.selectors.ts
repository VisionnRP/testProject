import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PhonebookState} from './phonebook.reducer';


export const selectPhonebook = createFeatureSelector<PhonebookState>('test');


export const isLoadedPhonebook = createSelector(
  selectPhonebook,
  state => state.list
);
