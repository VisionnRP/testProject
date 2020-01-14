import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as PhonebookActions from './phonebook.actions';


import {mergeMap, map, tap, filter} from 'rxjs/operators';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class PhonebookEffects {
    @Effect()
    loadArticles$ = this.actions$.pipe(
      ofType(PhonebookActions.load),
      mergeMap(() =>
        this.firebaseService.getAll().pipe(
          map((results: Phonebook) => PhonebookActions.loadsucces({ result: results})),
        )
      )
    );

    @Effect()
    addPhonebook$ = this.actions$.pipe(
      ofType(PhonebookActions.addPhonebook),
      mergeMap((value) => this.firebaseService.add(value.valueAdd, value.idUser).pipe(
        map((phonebooks: any) => PhonebookActions.addPhonebookSuccess({ phonebook: phonebooks}))
      ))
    );

    @Effect()
    deletePhonebook$ = this.actions$.pipe(
      ofType(PhonebookActions.deletePhonebook),
      mergeMap((value) => this.firebaseService.delete(value.valueDelete).pipe(
        map((phonebooks: any) => PhonebookActions.deletePhonebookSuccess({ phonebook: phonebooks}))
      ))
    );

    @Effect()
    updatePhonebook$ = this.actions$.pipe(
      ofType(PhonebookActions.updatePhonebook),
      tap(x => {
        debugger
      }),
      mergeMap((value) => this.firebaseService.update(value.valueUpdate).pipe(
        map((phonebooks: any) => PhonebookActions.updatePhonebookSuccess({ phonebook: phonebooks}))
      ))
    );

    @Effect()
    login$ = this.actions$.pipe(
      ofType(PhonebookActions.login),
      mergeMap((result) => this.firebaseService.getAll().pipe(
        tap(data => data =  data.filter( ev => ev.email === result.loginValue)),
        map((users: any) => PhonebookActions.loginSuccess({ user: users.filter( ev => ev.email === result.loginValue)})),
      ))
    );

    constructor(
      private actions$: Actions,
      private firebaseService: FirebaseService
    ) {}
  }
