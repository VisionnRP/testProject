import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  collection: AngularFirestoreCollection<Phonebook>;
  phonebook$: Observable<Phonebook[]>;
  addButton = 'ADD';
  form: FormGroup = new FormGroup({
    key: new FormControl(),
    email: new FormControl(''),
    phoneNumber: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required)
  });


  getAll() {
    this.collection = this.firebase.collection<Phonebook>('phonebook');
    this.phonebook$ = this.collection.valueChanges();
    return this.phonebook$;
  }
}
