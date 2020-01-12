import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  emailRequired: any;

  constructor(private fb: FormBuilder) { }
}
