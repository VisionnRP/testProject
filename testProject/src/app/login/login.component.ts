import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase/firebase.service';
import { map, tap } from 'rxjs/operators';
import { LoginServiceService } from '../logins/login-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  phonebookUsers;
  emailForm: FormGroup;
  constructor(private fb: FormBuilder, private route: Router, private firebase: FirebaseService, private ngEmail: LoginServiceService) { }

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
  });

  ngOnInit() {
  this.emailForm = this.fb.group({
      email: [, Validators.required],
    });
  }

  // onSubmit(e) {
  //   this.firebase.getAll().pipe(
  //     map(changes =>
  //       changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
  //     ),
  //     map(value => {
  //      value.forEach(element => {
  //       if (element[`email`] === this.emailForm.value.email) {
  //         this.ngEmail.emailRequired = element;
  //         this.route.navigate([`/phonebook`]);
  //       }
  //      });
  //     })
  //   ).subscribe();
  // }
}
