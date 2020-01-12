import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { map, filter, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginServiceService } from '../logins/login-service.service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription, pipe } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { load, loadsucces } from '../store/phonebook.actions';
import { selectVisible } from '../store/phonebook.reducer';


interface Item {
  id: string;
  email: string;
  fullname: string;
  phone: string;
}

// later
// import * as actions from '../store/phonebook.actions';
// import * as fromPizza from '../store/phonebook.reducer';
// import * as fromRoot from '../store/phonebook.reducer';



@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.scss']
})
export class PhonebookComponent implements OnInit {

  phonebook$: Observable<Phonebook[]> = this.store.select(state => state.phone);
  phonebook;

  constructor(private service: FirebaseService, private store: Store<{phone: Phonebook[]}>) {

    }

  ngOnInit() {
    this.store.dispatch(load(this.phonebook));
    this.phonebook$.subscribe(data => console.log(data));
    // const vm$ = this.store.select(state => state)
    // this.itemCollection = this.afs.collection('phonebook');
    // this.items = this.itemCollection.valueChanges();
    // this.items.subscribe(data => console.log(data));
    // if (this.ngEmail.emailRequired === undefined) {
    //   this.routes.navigate([``]);
    // }
    //this.getAll();
  }
  // onSubmit() {
  //   if (this.service.form.valid) {
  //     this.service.add(this.service.form.value);
  //   }
  // }

  // getAll() {
  //   this.service.getAll().pipe(
  //     map(changes =>
  //       changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
  //     ),
  //   ).subscribe(customers => {
  //     this.phonebookList = customers;
  //   });
  // }
  // delete(value) {
  //   this.service.delete(value);
  // }
  // update(value) {
  //   this.service.update(value);
  // }
}



 // x.forEach(element => {
//   if (element[`phoneId`] === this.ngEmail.emailRequired[`key`] && element[`key`] !== this.ngEmail.emailRequired[`key`]) {
//     this.phonebookList.push(element);
//   }
// });

  // itemCollection: AngularFirestoreCollection<Item>;
  // items: Observable<Item[]>;
  // phonebookList;