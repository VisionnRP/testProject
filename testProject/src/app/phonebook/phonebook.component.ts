import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import * as action from '../store/phonebook.actions';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {isLoadedPhonebook} from '../store/phonebook.selectors';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.scss']
})
export class PhonebookComponent implements OnInit {
  submitButtonBoolean;
  phonebook$: Observable<Phonebook> = this.store.pipe(select(isLoadedPhonebook));


  constructor(private service: FirebaseService, private store: Store<Phonebook[]>) {

  }

  ngOnInit() {
    this.store.dispatch(action.load());
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
      this.store.dispatch(action.addPhonebook({valueAdd: this.service.form.value}));
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
}
