import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators, FormGroupName, FormBuilder} from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map, filter } from 'rxjs/operators';
import { isUser } from '../store/phonebook.selectors';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private store: Store<Phonebook[]>, private firebase: AngularFirestore, public fb: FormBuilder) { }
  user$: Observable<Phonebook> = this.store.pipe(select(isUser));
  user;

  collection = this.firebase.collection('phonebook');
  form: FormGroup = new FormGroup({
    email: new FormControl(),
    phone: new FormControl('', Validators.required),
    fullname: new FormControl('', Validators.required)

  });


  getAll(): Observable<any> {
    return this.collection.valueChanges();
  }

  add(value: Phonebook, a): Observable<any> {
    const stringForIdentifier = this.randomString();
    this.user$.subscribe(
      data => {
        this.collection.doc(stringForIdentifier).set({...value, id: stringForIdentifier, phoneId: data[0].id });
      });
    return  this.collection.valueChanges();
  }

  delete(value: Phonebook): Observable<any> {
     this.collection.doc(value.id).delete();
     return  this.collection.valueChanges();
  }

  update(value: Phonebook): Observable<any> {
    this.collection.doc(value.id).update(value);
    return this.collection.valueChanges();
  }

  randomString() {
    return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  getUserId(userObs: Observable<Phonebook>, user: Phonebook) {
    userObs.subscribe(value => user = value);
  }

}
