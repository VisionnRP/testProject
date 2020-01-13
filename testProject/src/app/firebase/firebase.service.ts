import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators, FormGroupName} from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { LoginServiceService } from '../logins/login-service.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebase: AngularFirestore, public authorizedEmail: LoginServiceService) { }
  collection = this.firebase.collection('phonebook');
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    phone: new FormControl('', Validators.required),
    fullname: new FormControl('', Validators.required)
  });


  getAll(): Observable<any> {
    return this.collection.valueChanges();
  }
  add(value: Phonebook): Observable<any> {
    const stringForIdentifier = this.randomString()
    this.collection.doc(stringForIdentifier).set({...value, id: stringForIdentifier});
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


}
