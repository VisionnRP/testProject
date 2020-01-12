import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/phonebook.reducer';
import { Observable } from 'rxjs';
import * as actions from '../store/phonebook.actions';
import * as fromPizza from '../store/phonebook.reducer';


@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.scss']
})
export class PhonebookComponent implements OnInit {

  phonebookList;
  pizzas: Observable<any>;
  constructor( public service: FirebaseService, private store: Store<fromPizza.State>) { }

  ngOnInit() {
    this.getAll();
    this.pizzas = this.store.select(fromPizza.selectAll);
    this.store.dispatch(new actions.Query() );
  }
  onSubmit() {
    if (this.service.form.valid) {
      this.service.add(this.service.form.value);
    }
  }

  getAll() {
    this.service.getAll().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(customers => {
      this.phonebookList = customers;
    });
  }
  delete(value) {
    this.service.delete(value);
  }
  update(value) {
    this.service.update(value);
  }

}
