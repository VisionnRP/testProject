import { Action, createAction, props } from '@ngrx/store';

export enum PhonebookActions {
    LoadPhonebook = '[Phonebook Page] Load Phonebook',
    PhonebookLoadedSuccess = '[Phonebook Page] Phonebook Loaded Success',
    PhonebookLoadedError = '[Phonebook Page] Phonebook Loaded Error'
  }

export const load = createAction('[Phonebook] load', props<{phonebook: Phonebook[]}>());
export const loadsucces = createAction('[Phonebook] load success', props<{phonebook: Phonebook[]}>());
export const loadfail = createAction('[Phonebook] load failed');
export class LoadPhonebook implements Action {
    readonly type = PhonebookActions.LoadPhonebook;
  }

export class PhonebookLoadedSuccess implements Action {
    readonly type = PhonebookActions.PhonebookLoadedSuccess;

    constructor(public payload: { phonebook: Phonebook[] }) {}
  }

export class PhonebookLoadedError implements Action {
    readonly type = PhonebookActions.PhonebookLoadedError;
  }

export type PhonebookUnion =
    | LoadPhonebook
    | PhonebookLoadedSuccess
    | PhonebookLoadedError;



