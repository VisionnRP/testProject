import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import * as action from '../store/phonebook.actions';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {isLoadedPhonebook, isUser} from '../store/phonebook.selectors';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.scss']
})
export class PhonebookComponent implements OnInit {

  // @ViewChild('fileInput') el: ElementRef;
  // imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  // editFile = true;
  // removeUpload = false;

  submitButtonBoolean;
  phonebook$: Observable<Phonebook> = this.store.pipe(select(isLoadedPhonebook));
  user$: Observable<Phonebook> = this.store.pipe(select(isUser));
  user: Phonebook;
  phonebook;
  updateForm;

  constructor( private cd: ChangeDetectorRef, private service: FirebaseService, private store: Store<Phonebook[]>, private route: Router) {
  }

  ngOnInit() {
    this.service.getUserId(this.user$, this.user);
    this.userFromStore();
    this.store.dispatch(action.load());
    this.phonebook$.pipe(
    map((data: any) => {
      if (Array.isArray(data)) {
        const id = this.user[0].id;
        this.phonebook = data.filter(value => value.phoneId === id);
       }
        // else if (!(data instanceof Array)) {
      //   console.log('ok');
      // }
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
  delele(value) {
    this.store.dispatch(action.deletePhonebook({valueDelete: value}));
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

  // uploadFile(event) {
  //   const reader = new FileReader(); // HTML5 FileReader API
  //   const file = event.target.files[0];
  //   if (event.target.files && event.target.files[0]) {
  //     reader.readAsDataURL(file);
  //
  //     // When file uploads set it to file formcontrol
  //     reader.onload = () => {
  //       this.imageUrl = reader.result;
  //       this.service.form.patchValue({
  //         file: reader.result
  //       });
  //       this.editFile = false;
  //       this.removeUpload = true;
  //     };
  //     // ChangeDetectorRef since file is loading outside the zone
  //     this.cd.markForCheck();
  //   }
  // }
}
