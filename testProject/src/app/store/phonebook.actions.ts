import { Action, createAction, props } from '@ngrx/store';

export const load = createAction('[Phonebook] load');
export const loadsucces = createAction('[Phonebook] load success', props<{result: Phonebook}>());
export const loadfail = createAction('[Phonebook] load failed', props<{error: any}>());

export const addPhonebook = createAction( '[Phonebook] add Phonebook', props<{valueAdd: Phonebook}>());
export const addPhonebookSuccess = createAction( '[Phonebook] add Phonebook Success', props<{ phonebook: Phonebook}>());

export const deletePhonebook = createAction( '[Phonebook] delete Phonebook', props<{valueDelete: Phonebook}>());
export const deletePhonebookSuccess = createAction( '[Phonebook] delete Phonebook Success', props<{ phonebook: Phonebook}>());

export const updatePhonebook = createAction( '[Phonebook] update Phonebook', props<{valueUpdate: Phonebook}>());
export const updatePhonebookSuccess = createAction( '[Phonebook] update Phonebook Success', props<{ phonebook: Phonebook}>());


