import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as PhonebookActions from './phonebook.actions';
import { AngularFireDatabase, PathReference } from 'angularfire2/database';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { switchMap, mergeMap, map, tap, catchError } from 'rxjs/operators';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class PhonebookEffects {
    @Effect()
    loadArticles$ = this.actions$.pipe(
      ofType(PhonebookActions.load),
      mergeMap(() =>
        this.firebaseService.getAll().pipe(
          map(phonebook => PhonebookActions.loadsucces({phonebook}))
        )
      )
    )

    constructor(
      private actions$: Actions,
      private firebaseService: FirebaseService
    ) {}
  }
