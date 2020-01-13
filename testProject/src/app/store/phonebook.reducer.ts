import { createSelector } from '@ngrx/store';
import * as actions from '../store/phonebook.actions';

import { createReducer, on } from '@ngrx/store';

export interface PhonebookState {
    list: Phonebook;
  }
export const initialState: PhonebookState = {
    list: null
  };

export const phonebookReducer = createReducer(
  initialState,
  on(actions.load, (state) => ({ ...state})),
  on(actions.loadsucces, (state, action) => ({ ...state, list: action.result })),
  on(actions.loadfail, (state, action) => ({ ...state})),

  on(actions.addPhonebook, (state, action) => ({ ...state, list: action.valueAdd })),
  on(actions.addPhonebookSuccess, (state, action) => ({ ...state, list: action.phonebook })),

  on(actions.deletePhonebook, (state, action) => ({ ...state, list: action.valueDelete })),
  on(actions.deletePhonebookSuccess, (state, action) => ({ ...state, list: action.phonebook })),

  on(actions.updatePhonebook, (state, action) => ({ ...state, list: action.valueUpdate })),
  on(actions.deletePhonebookSuccess, (state, action) => ({ ...state, list: action.phonebook })),
  );
export function counterReducer(state, action) {
  return phonebookReducer(state, action);
}
