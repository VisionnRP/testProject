import { Injectable, ChangeDetectorRef } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { isUser } from '../store/phonebook.selectors';
import {imgUrl } from '../image';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // tslint:disable-next-line:max-line-length
  constructor( private store: Store<Phonebook[]>, private firebase: AngularFirestore, public fb: FormBuilder) { }
  user$: Observable<Phonebook> = this.store.pipe(select(isUser));
  user;
  urlUserPicture = imgUrl;
  collection = this.firebase.collection('phonebook');
  form: FormGroup = new FormGroup({
    photo: new FormControl(imgUrl),
    email: new FormControl(),
    phone: new FormControl('', Validators.required),
    fullname: new FormControl('', Validators.required)

  });


  getAll(): Observable<any> {
    return this.collection.valueChanges();
  }

  add(value: Phonebook, a): Observable<any> {
    this.user$.subscribe(data => this.user = data);
    console.log(this.user);
    const stringForIdentifier = this.randomString();
    this.collection.doc(stringForIdentifier).set({...value, id: stringForIdentifier, phoneId: this.user[0].id});
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



