import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import * as action from '../store/phonebook.actions';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {isLoadedPhonebook, isUser} from '../store/phonebook.selectors';
import { Router } from '@angular/router';
import { filter, map, delay } from 'rxjs/operators';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.scss']
})
export class PhonebookComponent implements OnInit {
  submitButtonBoolean;
  phonebook$: Observable<Phonebook> = this.store.pipe(select(isLoadedPhonebook));
  user$: Observable<Phonebook> = this.store.pipe(select(isUser));
  user: Phonebook;

  constructor(private service: FirebaseService, private store: Store<Phonebook[]>, private route: Router) {
  }

  ngOnInit() {
    this.service.getUserId(this.user$, this.user);
    this.userFromStore();
    this.store.dispatch(action.load());
    this.phonebook$.pipe(
    map(x => x.filter(arr => arr.phoneId === this.user[0].id))).subscribe();
  }

  onSubmit(e) {
    if (this.submitButtonBoolean) {
      this.update(e);
      this.submitButtonBoolean = false;
    } else { 
      this.add(e);
    }
  }

  add(e) {
    if (this.service.form.valid) {
      this.store.dispatch(action.addPhonebook({valueAdd: {...this.service.form.value}, idUser: {...this.user}}));
      this.service.form.reset();
    }
  }
  delele(value) {
    this.store.dispatch(action.deletePhonebook({valueDelete: value}));
  }

  updateButton(value) {
    this.submitButtonBoolean = true;
    this.service.form.patchValue(value);
  }

  // todo update
  update(e) {
    if (this.service.form.valid) {
      this.store.dispatch(action.updatePhonebook({valueUpdate: this.service.form.value}));
      this.service.form.reset();
    }
  }
  updateSpecialPhoneNumber(value: Phonebook) {
    this.store.dispatch(action.updatePhonebook({valueUpdate: {...value, isSpecial: !value.isSpecial}}));
  }

  logout() {
    this.store.dispatch(action.logout());
    this.route.navigate(['']);
  }

  userFromStore() {
    this.user$.subscribe(data => {
      this.user = data;
    });
  }

//  private checkUserLogin() {
//     if (this.user === null) {
//       this.route.navigate(['']);
//     }
//   }
}
