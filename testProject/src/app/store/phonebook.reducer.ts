import { createSelector, Action } from '@ngrx/store';
import { PhonebookUnion, PhonebookActions } from './phonebook.actions';

import * as action from './phonebook.actions';
import { createReducer, on } from '@ngrx/store';


export interface State {
   list: Phonebook[];
  }
export interface Initial {
    count: State;
}
export const initialState: State = {
    list: []
  };

const reducers = createReducer(
    initialState,
    on(action.load, state => ({ ...state, list: state.list })),
    on(action.loadsucces, state => ({ ...state, list: state.list })),
  );

export function reducer(state: State | undefined, action: Action) {
    return reducers(state, action);
  }

export const selectPhonebook = (state: Initial) => state.count;

export const selectVisible = createSelector(
    selectPhonebook, (state: State) => state.list);
// export interface PhonebookState {
//     list: Phonebook[];
//   }
// export const initialState: PhonebookState = {
//     list: []
//   };

// export function phonebookReducer(
//   state = initialState,
//   action: PhonebookUnion
// ) {
//   switch (action.type) {
//     case PhonebookActions.PhonebookLoadedSuccess:
//       return {
//         ...state,
//         list: action.payload.phonebook
//       };
//     case PhonebookActions.PhonebookLoadedError:
//       return {
//         ...state,
//         list: []
//       };
//     default:
//       return state;
//   }
// }

// const selectPhonebook = (state) => state.list;
// console.log(selectPhonebook);

// export const selectPhonebookList = createSelector(
//     selectPhonebook,
//   (state: PhonebookState) => state.list
// )