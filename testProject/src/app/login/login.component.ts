import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {map, filter, tap, switchMap, mergeMap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { isLoadedPhonebook, isUser } from '../store/phonebook.selectors';
import * as action from '../store/phonebook.actions';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user$: Observable<Phonebook> = this.store.pipe(select(isUser));
  emailForm: FormGroup;
  userRequired: any;

  constructor(public snackBar: MatSnackBar, private fb: FormBuilder, private store: Store<Phonebook[]>, private route: Router ) { }
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
  });

  ngOnInit() {
    this.user$.subscribe();
    this.emailForm = this.fb.group({
      email: [, Validators.required],
    });
  }

  login() {
    this.store.dispatch(action.login({loginValue: this.emailForm.value.email}));
    this.user$.pipe(map((data: any) => {
      if (data === null) {
        return;
      } else if ( data.length !== 0) {
        this.route.navigate(['phonebook']);
      } else if ( data.length === 0) {
        this.openSnackBar('Invalid Email', '');
      }
    })).subscribe();
    this.emailForm.reset();
  }

  openSnackBar(message: string, actions: string) {
    this.snackBar.open(message, actions, {
      duration: 2000,
    });
  }
}
