import {Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import * as action from '../store/phonebook.actions';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {isLoadedPhonebook, isUser} from '../store/phonebook.selectors';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  phonebook;
  updateForm;
  name: any;
  animal: any;
  

  constructor(public dialog: MatDialog, private service: FirebaseService, private store: Store<Phonebook[]>, private route: Router) {
  }

  ngOnInit() {
    this.service.getUserId(this.user$, this.user);
    this.userFromStore();
    this.store.dispatch(action.load());
    this.phonebook$.pipe(
    map((data: any) => {
      if (data === null) {
        return;
      }
      if (Array.isArray(data)) {
        const id = this.user[0].id;
        this.phonebook = data.filter(value => value.phoneId === id);
        this.isDuplicate(this.phonebook);
       }

    })).subscribe();
  }

  onSubmit(e) {
    if (this.submitButtonBoolean) {
      this.update();
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
  delele(value: Phonebook) {
    if (value.isSpecial) {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '250px',
          data: {result: value}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.store.dispatch(action.deletePhonebook({valueDelete: result}));
        });
    } else {
    this.store.dispatch(action.deletePhonebook({valueDelete: value}));
    }
  }

  updateButton(value) {
    this.updateForm = value;
    this.submitButtonBoolean = true;
    this.service.form.patchValue(value);
  }

  update() {
    if (this.service.form.valid) {
      this.store.dispatch(action.updatePhonebook({
          valueUpdate: {...this.updateForm, email: this.service.form.value.email,
          fullname: this.service.form.value.fullname,
          phone: this.service.form.value.phone
        }}));
      this.service.form.reset();
    }
  }
  updateSpecialPhoneNumber(value: Phonebook) {
    this.store.dispatch(action.updatePhonebook({valueUpdate: {...value, isSpecial: !value.isSpecial}}));
  }
  //  todo
  updateDuplicatePhoneNumber(value: Phonebook) {
    this.store.dispatch(action.updatePhonebook({valueUpdate: {...value, isDuplicate: true}}));
  }

  logout() {
    this.store.dispatch(action.logout());
    this.route.navigate(['']);
  }

  userFromStore() {
    this.user$.pipe(map((data: any) => {
      if (data === null) {
        this.route.navigate(['']);
      } else if ( data.length === 0) {
        this.route.navigate(['']);
      } else {
        this.user = data;
      }
    })).subscribe();
  }

  isDuplicate(arr: any) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < arr.length; j++) {
        if (JSON.stringify(arr[i]) !== JSON.stringify(arr[j])) {
          if (arr[i].phone === arr[j].phone) {
            this.store.dispatch(action.updatePhonebook({valueUpdate: {...arr[i], isDuplicate: true}}));
            this.store.dispatch(action.updatePhonebook({valueUpdate: {...arr[j], isDuplicate: true}}));
          }
        }
      }
    }
  }
}
