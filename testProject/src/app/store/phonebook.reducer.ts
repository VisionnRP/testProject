











import * as actions from './phonebook.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

// Main data interface

// tslint:disable-next-line:class-name
export interface phonebook {
  id: any;
  loading: boolean;
  fullName: string;
  phoneNumber: string;
  email: string;
  error?: string;
}

// Entity adapter
export const pizzaAdapter = createEntityAdapter<phonebook>();
export interface State extends EntityState<phonebook> { }


export const initialState: State = pizzaAdapter.getInitialState();

// Reducer

export function phonebookReduser(
    state: State = initialState,
    action: actions.PizzaActions) {

    switch (action.type) {

        case actions.ADDED:
            return pizzaAdapter.addOne(action.payload, state);

        case actions.MODIFIED:
            return pizzaAdapter.updateOne({
                id: action.payload.id,
                changes: action.payload
            }, state);

        case actions.REMOVED:
            return pizzaAdapter.removeOne(action.payload.id, state);

        default:
            return state;
    }

}

// Create the default selectors

export const getPizzaState = createFeatureSelector<State>('phonebook');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = pizzaAdapter.getSelectors(getPizzaState);

