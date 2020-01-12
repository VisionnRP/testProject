import { ActionReducerMap } from '@ngrx/store';
import { phonebookReduser } from './phonebook.reducer';

export const reducers: ActionReducerMap<any> = {
    pizza: phonebookReduser
};
