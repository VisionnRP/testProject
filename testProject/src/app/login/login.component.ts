import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { map, filter, tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { isLoadedPhonebook, isUser } from '../store/phonebook.selectors';
import * as action from '../store/phonebook.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user$: Observable<Phonebook> = this.store.pipe(select(isUser));
  emailForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<Phonebook[]>, private route: Router ) { }

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
  });

  ngOnInit() {
  this.emailForm = this.fb.group({
      email: [, Validators.required],
    });
  }

  login(value: string) {
    this.store.dispatch(action.login({loginValue: this.emailForm.value.email}));
    this.route.navigate(['phonebook']);
  }
}
