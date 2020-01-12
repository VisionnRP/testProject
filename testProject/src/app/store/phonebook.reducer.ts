import { createSelector } from '@ngrx/store';
import { PhonebookUnion, PhonebookActions } from './phonebook.actions';

import { createReducer, on } from '@ngrx/store';

export interface PhonebookState {
    list: Phonebook[];
  }
export const initialState: PhonebookState = {
    list: []
  };

export function phonebookReducer(
  state = initialState,
  action: PhonebookUnion
) {
  switch (action.type) {
    case PhonebookActions.PhonebookLoadedSuccess:
      return {
        ...state,
        list: action.payload.phonebook
      };
    case PhonebookActions.PhonebookLoadedError:
      return {
        ...state,
        list: []
      };
    default:
      return state;
  }
}

const selectPhonebook = (state) => state.list;
console.log(selectPhonebook);

export const selectPhonebookList = createSelector(
    selectPhonebook,
  (state: PhonebookState) => state.list
)