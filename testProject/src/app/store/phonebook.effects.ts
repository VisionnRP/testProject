import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { phonebook } from './phonebook.reducer';
import * as pizzaActions from './phonebook.actions';
import { AngularFireDatabase, PathReference } from 'angularfire2/database';

import { AngularFirestores, AngularFirestoreCollection } from 'angularfire2/firestore';

import { switchMap, mergeMap, map, tap } from 'rxjs/operators';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class PizzaEffects {


    @Effect()
    query$: Observable<Action> = this.actions$.pipe(
      ofType(pizzaActions.QUERY),
      tap(data => {
        debugger
        console.log(data);
      }),
      switchMap(action => {
        console.log(action);
        return this.afs.collection<phonebook>('phonebook').stateChanges();
      }),
      mergeMap(actions =>  actions),
      map(action => {
        return {
          type: `[Pizza] ${action.type}`,
          payload: { id: action.payload.doc.id, ...action.payload.doc.data() }
        };
      })
    );

    constructor(private actions$: Actions, private afs: AngularFirestore, public service: FirebaseService) { }
}
