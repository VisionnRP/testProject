import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebase: AngularFireDatabase) { }

  phonebook: AngularFireList<any[]>;
  addButton = 'ADD';
  form: FormGroup = new FormGroup({
    key: new FormControl(),
    email: new FormControl(''),
    phoneNumber: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required)
  });


  getAll() {
    this.phonebook = this.firebase.list('phonebook');
    return this.phonebook.snapshotChanges();
  }
  add(value: any) {
    this.phonebook.push(value);
    this.resetForm();
  }

  update(value: any) {
    this.form.patchValue(value);
    this.addButton = 'UPDATE';
  }

  delete(value) {
    this.phonebook.remove(value);
  }

  resetForm() {
    this.addButton = 'ADD';
    this.form.reset();
  }
}
